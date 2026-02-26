import { useEffect, useState } from 'react'
import axios from 'axios'

import {
  Page,
  PageHeader,
  SubTitle,
  Title,
  UsersContainer,
  UserCard,
  UserInfo,
  Name,
  Info,
  RoleBadge,
} from './styledComponents'

const AdminUsers = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('authToken')

      const res = await axios.get('http://localhost:5000/admin/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setUsers(res.data)
    }

    fetchUsers()
  }, [])

  return (
    <Page>
      <PageHeader>
        <Title>Users</Title>
        <SubTitle>{users.length} users</SubTitle>
      </PageHeader>

      <UsersContainer>
        {users.map((user) => (
          <UserCard key={user._id}>
            <UserInfo>
              <Name>
                {user.firstName} {user.lastName}
              </Name>
              <Info>{user.emailID}</Info>
              <Info>Contact: {user.contactNo}</Info>
            </UserInfo>

            <RoleBadge role={user.role}>{user.role}</RoleBadge>
          </UserCard>
        ))}
      </UsersContainer>
    </Page>
  )
}

export default AdminUsers
