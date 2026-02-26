import styled from 'styled-components'

export const Page = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`

export const PageHeader = styled.div`
  margin-bottom: 30px;
`

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 600;
  margin-bottom: 6px;
  color: #0f172a;
`

export const SubTitle = styled.p`
  font-size: 14px;
  color: #64748b;
`

export const UsersContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding-right: 10px;

  /* smooth scrollbar */
  scrollbar-width: thin;
`

export const UserCard = styled.div`
  background: #ffffff;
  padding: 20px 24px;
  border-radius: 14px;
  margin-bottom: 18px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  border: 1px solid #e2e8f0;
  box-shadow: 0 6px 18px rgba(15, 23, 42, 0.04);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.08);
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
