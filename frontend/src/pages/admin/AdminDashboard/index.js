import { useNavigate } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'

import AdminOrders from '../../AdminOrders'
import AdminProducts from '../../AdminProducts'
import AdminUsers from '../../AdminUsers'

import {
  Container,
  Sidebar,
  Title,
  MenuItem,
  Content,
} from './styledComponents.js'

const AdminDashboard = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <Sidebar>
        <Title>Admin</Title>
        <MenuItem onClick={() => navigate('/admin/orders')}>Orders</MenuItem>
        <MenuItem onClick={() => navigate('/admin/products')}>
          Products
        </MenuItem>
        <MenuItem onClick={() => navigate('/admin/users')}>Users</MenuItem>
      </Sidebar>

      <Content>
        <Content>
          <Routes>
            <Route path="orders" element={<AdminOrders />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="users" element={<AdminUsers />} />
          </Routes>
        </Content>
      </Content>
    </Container>
  )
}

export default AdminDashboard
