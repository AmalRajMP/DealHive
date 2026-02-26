import { useEffect, useState } from 'react'
import authFetch from '../../utils/authFetch'

import {
  Container,
  Title,
  Card,
  TopRow,
  OrderId,
  SmallText,
  Status,
  Section,
  Strong,
  ItemRow,
  Total,
} from './styledComponents'

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
          <TopRow>
            <div>
              <OrderId>Order #{order._id.slice(-6)}</OrderId>
              <SmallText>
                {new Date(order.createdAt).toLocaleString()}
              </SmallText>
            </div>

            <Status style={{ color: statusColor[order.status] }}>
              {order.status.toUpperCase()}
            </Status>
          </TopRow>

          <Section>
            <Strong>Customer:</Strong>
            <span>
              {order.user
                ? `${order.user.firstName ? order.user.firstName : ''} ${order.user.lastName ? order.user.lastName : ''} (${order.user.emailID})`
                : 'User deleted'}
            </span>
          </Section>

          <Section>
            <Strong>Address:</Strong>
            <span>{order.address}</span>
          </Section>

          <Section>
            <Strong>Items:</Strong>
            {order.items.map((item, index) => (
              <ItemRow key={index}>
                <span>{item.product?.name}</span>
                <span>x {item.quantity}</span>
                <span>₹ {item.price}</span>
              </ItemRow>
            ))}
          </Section>

          <Total>₹ {order.totalAmount}</Total>

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
