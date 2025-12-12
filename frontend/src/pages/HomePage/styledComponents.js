import styled from 'styled-components'

export const MainContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(135deg, #e8f3ff 0%, #d4e7ff 40%, #b5d7ff 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`
export const Navbar = styled.nav`
  width: 100%;
  display: flex;
`
export const NavWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`
export const WebsiteLogo = styled.img`
  height: 130px;
  width: 130px;
  margin: -50px;
  outline none;
`
export const SearchbarWrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
  color: #000000;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  padding: 10px 20px 10px 20px;
`
export const SearchIcon = styled.div`
  height: 30px;
  width: 20px;
  align-self: center;
  padding-top: 6px;
`
export const SearchInput = styled.input`
  height: 100%;
  width: 100%;
  font-size: 14px;
  border: none;
  outline: none;
`
