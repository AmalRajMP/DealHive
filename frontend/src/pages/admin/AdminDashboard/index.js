import { useNavigate } from 'react-router-dom'

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
        <MenuItem onClick={() => navigate('orders')}>Orders</MenuItem>
        <MenuItem onClick={() => navigate('products')}>Products</MenuItem>
      </Sidebar>

      <Content>
        <h1>Welcome Admin</h1>
      </Content>
    </Container>
  )
}

export default AdminDashboard
