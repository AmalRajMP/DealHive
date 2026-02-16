import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import authFetch from '../../../utils/authFetch'

import {
  Container,
  Title,
  Form,
  Input,
  TextArea,
  Select,
  Button,
} from './styledComponents'

const AddProduct = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({})

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    const discountPercent = Math.round(
      ((form.originalPrice - form.discountPrice) / form.originalPrice) * 100,
    )

    const productData = {
      ...form,
      originalPrice: Number(form.originalPrice),
      discountPrice: Number(form.discountPrice),
      discountPercent,
      rating: 0,
      reviews: [],
      images: [form.thumbnail],
      serviceCenters: [],
    }

    console.log('Sending:', productData)

    const res = await authFetch('http://localhost:5000/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productData),
    })

    const data = await res.json()
    console.log('Response:', data)

    if (!res.ok) {
      alert(data.error || data.message || 'Failed to add product')
      return
    }

    alert('Product added successfully')
    navigate('/admin/products')
  }

  return (
    <Container>
      <Title>Add Product</Title>

      <Form>
        <Input
          name="title"
          placeholder="Product Title"
          onChange={handleChange}
        />
        <Input name="brand" placeholder="Brand" onChange={handleChange} />
        <Input
          name="originalPrice"
          placeholder="Original Price"
          onChange={handleChange}
        />
        <Input
          name="discountPrice"
          placeholder="Discount Price"
          onChange={handleChange}
        />

        <Select name="category" onChange={handleChange}>
          <option>Category</option>
          <option value="mens-watches">Mens Watches</option>
          <option value="womens-watches">Womens Watches</option>
        </Select>

        <Input
          name="thumbnail"
          placeholder="Image URL"
          onChange={handleChange}
        />

        <TextArea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />

        <Button type="button" onClick={handleSubmit}>
          Add Product
        </Button>
      </Form>
    </Container>
  )
}

export default AddProduct
