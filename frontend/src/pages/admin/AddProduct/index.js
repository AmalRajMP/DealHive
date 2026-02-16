import { useState } from 'react'
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
  const [form, setForm] = useState({})

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
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

        <Button type="button">Add Product</Button>
      </Form>
    </Container>
  )
}

export default AddProduct
