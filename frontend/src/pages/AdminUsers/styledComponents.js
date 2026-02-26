import styled from 'styled-components'

export const Page = styled.div`
  padding: 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const Title = styled.h2`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 25px;
`

export const UsersContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 10px;

  /* smooth scrollbar */
  scrollbar-width: thin;
`

export const UserCard = styled.div`
  background: linear-gradient(145deg, #ffffff, #f9fbfd);
  padding: 22px 28px;
  border-radius: 16px;
  margin-bottom: 20px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border: 1px solid #eef2f7;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);

  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 35px rgba(0, 0, 0, 0.08);
    border-color: #e2e8f0;
  }
`

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`

export const Name = styled.p`
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 5px;
`

export const Info = styled.p`
  font-size: 14px;
  color: #666;
  margin: 2px 0;
`

export const RoleBadge = styled.span`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  background: ${({ role }) => (role === 'admin' ? '#e0f2ff' : '#f2f2f2')};
  color: ${({ role }) => (role === 'admin' ? '#0077cc' : '#555')};
`
