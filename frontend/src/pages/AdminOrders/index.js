import { useEffect, useState } from 'react'
import authFetch from '../../utils/authFetch'

import {
  Container,
  PageHeader,
  Title,
  SubTitle,
  Card,
  TopRow,
  OrderId,
  SmallText,
  Status,
  Section,
  Strong,
  ItemRow,
  Total,
  TotalLabel,
  TotalAmount,
  BottomRow,
  StatusSelect,
  AddressBox,
  AddressName,
  AddressLine,
  AddressPhone,
} from './styledComponents'

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
      <PageHeader>
        <Title>Orders</Title>
        <SubTitle>{orders.length} orders</SubTitle>
      </PageHeader>

      {orders.map((order) => (
        <Card key={order._id}>
          <TopRow>
            <div>
              <OrderId>Order #{order._id.slice(-6)}</OrderId>
              <SmallText>
                {new Date(order.createdAt).toLocaleString()}
              </SmallText>
            </div>

            <Status status={order.status}>{order.status.toUpperCase()}</Status>
          </TopRow>

          <Section>
            <Strong>Items:</Strong>

            {order.items.map((item, index) => (
              <ItemRow key={index}>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                  <img
                    src={item.product?.thumbnail}
                    alt={item.product?.title}
                    style={{
                      width: '50px',
                      height: '50px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                    }}
                  />

                  <div>
                    <strong>{item.product?.title || 'Product removed'}</strong>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>
                      Qty: {item.quantity}
                    </div>
                  </div>
                </div>

                <div style={{ fontWeight: 500 }}>
                  ₹ {item.price * item.quantity}
                </div>
              </ItemRow>
            ))}
          </Section>

          <Section>
            <Strong>Delivery Address</Strong>

            <AddressBox>
              <AddressName>{order.address?.fullName}</AddressName>

              <AddressLine>{order.address?.addressLine}</AddressLine>

              <AddressLine>
                {order.address?.city}, {order.address?.state}
              </AddressLine>

              <AddressLine>PIN: {order.address?.pincode}</AddressLine>

              <AddressPhone>📞 {order.address?.phone}</AddressPhone>
            </AddressBox>
          </Section>

          <BottomRow>
            <Total>
              <TotalLabel>Total Amount</TotalLabel>
              <TotalAmount>₹ {order.totalAmount.toLocaleString()}</TotalAmount>
            </Total>

            <StatusSelect
              value={order.status}
              onChange={(event) => onChangeStatus(event, order)}
            >
              <option value="pending">Pending</option>
              <option value="placed">Placed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </StatusSelect>
          </BottomRow>
        </Card>
      ))}
    </Container>
  )
}

export default AdminOrders
