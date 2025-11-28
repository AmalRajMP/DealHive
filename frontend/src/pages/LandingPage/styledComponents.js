import styled from 'styled-components'

export const MainContainer = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
`
export const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px 0px 15px;
`
export const WebsiteLogo = styled.img`
  height: 100px;
  min-width: 110px;
  max-width: 200px;
  margin-top: -15px;
  padding: 0px;
`
export const AuthContainer = styled.div`
  display: flex;
  gap: 20px;
`
export const AuthButton = styled.button`
  background-color: transparent;
  color: #4a86e7ff;
  font-size: 14px;
  font-weight: 500;
  border-width: 0px;
  margin-top: -20px;
`
