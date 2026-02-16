import { useEffect, useState } from 'react'
import authFetch from '../../utils/authFetch'

import {
  Container,
  Title,
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
} from './styledComponents'

const AdminProducts = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await authFetch('http://localhost:5000/admin/products')
      const data = await res.json()
      setProducts(data)
    }
    fetchProducts()
  }, [])

  const deleteProduct = async (id) => {
    await authFetch(`http://localhost:5000/admin/products/${id}`, {
      method: 'DELETE',
    })

    setProducts((prev) => prev.filter((p) => p._id !== id))
  }

  return (
    <Container>
      <Title>Admin Products</Title>

      {products.map((p) => {
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
              <EditBtn onClick={() => console.log('Edit', p._id)}>Edit</EditBtn>

              <DeleteBtn onClick={() => deleteProduct(p._id)}>Delete</DeleteBtn>
            </Actions>
          </Card>
        )
      })}
    </Container>
  )
}

export default AdminProducts
