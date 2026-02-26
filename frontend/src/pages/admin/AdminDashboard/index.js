import { Routes, Route, NavLink } from 'react-router-dom'

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
  return (
    <Container>
      <Sidebar>
        <Title>Admin</Title>
        <MenuItem as={NavLink} to="/admin/orders">
          Orders
        </MenuItem>
        <MenuItem as={NavLink} to="/admin/products">
          Products
        </MenuItem>

        <MenuItem as={NavLink} to="/admin/users">
          Users
        </MenuItem>
      </Sidebar>

      <Content>
        <Routes>
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="users" element={<AdminUsers />} />
        </Routes>
      </Content>
    </Container>
  )
}

export default AdminDashboard
