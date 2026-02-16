import { useEffect, useState } from 'react'
import authFetch from '../../utils/authFetch'

import { Container, Title, Card, Text } from './styledComponents.js'

const AdminOrders = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await authFetch('/admin/orders')
        const data = await res.json()
        setOrders(data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchOrders()
  }, [])

  return (
    <Container>
      <Title>Orders</Title>

      {orders.map((order) => (
        <Card key={order._id}>
          <Text>Order ID: {order._id}</Text>
          <Text>Status: {order.status}</Text>
        </Card>
      ))}
    </Container>
  )
}

export default AdminOrders
