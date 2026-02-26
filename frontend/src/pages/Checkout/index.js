import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  PageContainer,
  FormCard,
  Title,
  Input,
  Row,
  Button,
  ErrorText,
} from './styledComponents'

const Checkout = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    addressLine: '',
    city: '',
    state: '',
    pincode: '',
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { fullName, phone, addressLine, city, state, pincode } = formData

    if (!fullName || !phone || !addressLine || !city || !state || !pincode) {
      setError('Please fill all fields')
      return
    }

    try {
      const token = localStorage.getItem('token')

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Order failed')
      }

      navigate('/orders-success') // or wherever you redirect
    } catch (err) {
      setError('Something went wrong. Try again.')
    }
  }

  return (
    <PageContainer>
      <FormCard onSubmit={handleSubmit}>
        <Title>Checkout</Title>

        {error && <ErrorText>{error}</ErrorText>}

        <Input
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
        />

        <Input
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />

        <Input
          name="addressLine"
          placeholder="Address Line"
          value={formData.addressLine}
          onChange={handleChange}
        />

        <Row>
          <Input
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
          />

          <Input
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
          />
        </Row>

        <Input
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
        />

        <Button type="submit">Place Order</Button>
      </FormCard>
    </PageContainer>
  )
}

export default Checkout
