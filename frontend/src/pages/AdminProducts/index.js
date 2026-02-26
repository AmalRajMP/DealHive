import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import authFetch from '../../utils/authFetch'

import {
  Container,
  HeaderRow,
  RightSection,
  Stats,
  Title,
  AddBtn,
  Card,
  Info,
  ProductTitle,
  Price,
  DeleteBtn,
  ProductImage,
  Left,
  Category,
  EditBtn,
  Actions,
  ModalOverlay,
  ModalBox,
  Input,
  SaveBtn,
  SearchInput,
} from './styledComponents'

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const [form, setForm] = useState({})
  const [searchTerm, setSearchTerm] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await authFetch('http://localhost:5000/admin/products')
      const data = await res.json()
      setProducts(data)
    }
    fetchProducts()
  }, [])

  const updateProduct = async () => {
    const res = await authFetch(
      `http://localhost:5000/admin/products/${editingProduct._id}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      },
    )

    const updated = await res.json()

    setProducts((prev) =>
      prev.map((p) => (p._id === updated._id ? updated : p)),
    )

    setEditingProduct(null)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const deleteProduct = async (id) => {
    await authFetch(`http://localhost:5000/admin/products/${id}`, {
      method: 'DELETE',
    })

    setProducts((prev) => prev.filter((p) => p._id !== id))
  }

  const searchResults = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Container>
      <HeaderRow>
        <div>
          <Title>Manage Products</Title>
          <Stats>{products.length} products</Stats>
        </div>

        <RightSection>
          <AddBtn onClick={() => navigate('/admin/add-product')}>
            + Add Product
          </AddBtn>

          <SearchInput
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </RightSection>
      </HeaderRow>
      {searchResults.map((p) => {
        console.log(p)
        return (
          <Card key={p._id}>
            <Left>
              <ProductImage src={p.thumbnail} alt={p.title} />

              <Info>
                <ProductTitle>{p.title}</ProductTitle>
                <Price>₹ {p.discountPrice}</Price>
                <Category>{p.category}</Category>
              </Info>
            </Left>

            <Actions>
              <EditBtn
                onClick={() => {
                  setEditingProduct(p)
                  setForm(p)
                }}
              >
                Edit
              </EditBtn>
              <DeleteBtn onClick={() => deleteProduct(p._id)}>Delete</DeleteBtn>
            </Actions>
          </Card>
        )
      })}
      {editingProduct && (
        <ModalOverlay onClick={() => setEditingProduct(null)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <h3>Edit Product</h3>

            <Input
              name="title"
              value={form.title || ''}
              onChange={handleChange}
            />

            <Input
              name="discountPrice"
              value={form.discountPrice || ''}
              onChange={handleChange}
            />

            <Input
              name="category"
              value={form.category || ''}
              onChange={handleChange}
            />

            <SaveBtn onClick={updateProduct}>Save</SaveBtn>
          </ModalBox>
        </ModalOverlay>
      )}
    </Container>
  )
}

export default AdminProducts
