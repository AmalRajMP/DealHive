import { useEffect, useState } from 'react'
import authFetch from '../../utils/authFetch'

import { Container, Title, Card, Text } from './styledComponents'

const statusColor = {
  pending: 'gray',
  placed: 'blue',
  shipped: 'orange',
  delivered: 'green',
  cancelled: 'red',
}

const AdminOrders = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const url = 'http://localhost:5000/admin/orders'
        const res = await authFetch(url)
        const data = await res.json()
        setOrders(data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchOrders()
  }, [])

  const onChangeStatus = async (event, order) => {
    const newStatus = event.target.value
    const url = `http://localhost:5000/admin/orders/${order._id}/status`
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    }
    await authFetch(url, options)

    setOrders((prevOrder) =>
      prevOrder.map((o) =>
        o._id === order._id ? { ...o, status: newStatus } : o,
      ),
    )
  }

  return (
    <Container>
      <Title>Orders</Title>

      {orders.map((order) => (
        <Card key={order._id}>
          <Text>Order ID: {order._id}</Text>
          <Text style={{ color: statusColor[order.status] }}>
            Status: {order.status}
          </Text>
          <select
            value={order.status}
            onChange={(event) => onChangeStatus(event, order)}
          >
            <option value="pending">Pending</option>
            <option value="placed">Placed</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </Card>
      ))}
    </Container>
  )
}

export default AdminOrders
