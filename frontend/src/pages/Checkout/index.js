import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Navbar from '../../components/Navbar'

import {
  PageContainer,
  CheckoutWrapper,
  ContentGrid,
  Card,
  HeaderSection,
  SectionTitle,
  ItemRow,
  ItemName,
  ItemPrice,
  Input,
  Row,
  Button,
  ErrorText,
  Image,
  ItemDetails,
  QtyText,
  SummaryCard,
  ItemsContainer,
  TotalContainer,
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
  const [cartItems, setCartItems] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('authToken')

        const response = await fetch('http://localhost:5000/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch cart')
        }

        const data = await response.json()

        const cart = data || []
        console.log('CART DATA:', cart)

        setCartItems(cart)

        const totalAmount = cart.reduce(
          (acc, item) =>
            acc + (item.productId?.discountPrice || 0) * item.quantity,
          0,
        )

        setTotal(totalAmount)
      } catch (err) {
        console.error(err)
      }
    }

    fetchCart()
  }, [])

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
      const token = localStorage.getItem('authToken')

      const response = await fetch(
        'http://localhost:5000/api/orders/checkout',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        },
      )

      if (!response.ok) {
        throw new Error('Order failed')
      }

      navigate('/orders-success')
    } catch (err) {
      setError('Something went wrong. Try again.')
    }
  }

  return (
    <>
      <Navbar />
      <PageContainer>
        <CheckoutWrapper>
          <HeaderSection>
            <h1>Checkout</h1>
            <p>Review your order and complete your purchase</p>
          </HeaderSection>
          <ContentGrid>
            <SummaryCard>
              <SectionTitle>Order Summary</SectionTitle>

              <ItemsContainer>
                {cartItems.map((item) => (
                  <ItemRow key={item.productId?._id}>
                    <Image
                      src={item.productId?.thumbnail}
                      alt={item.productId?.title}
                    />

                    <ItemDetails>
                      <ItemName>{item.productId?.title}</ItemName>
                      <QtyText>Qty: {item.quantity}</QtyText>
                    </ItemDetails>

                    <ItemPrice>
                      ₹ {(item.productId?.discountPrice || 0) * item.quantity}
                    </ItemPrice>
                  </ItemRow>
                ))}
              </ItemsContainer>

              <TotalContainer>
                <span>Total</span>
                <strong>₹ {total}</strong>
              </TotalContainer>
            </SummaryCard>

            <Card>
              <SectionTitle>Shipping Address</SectionTitle>

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

              <Button onClick={handleSubmit}>Place Order</Button>
            </Card>
          </ContentGrid>
        </CheckoutWrapper>
      </PageContainer>
    </>
  )
}

export default Checkout
