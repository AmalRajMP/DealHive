import styled from 'styled-components'

export const Navbar = styled.nav`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #f8fbff;
  box-shadow: 0 2px 8px rgba(94, 169, 250, 0.15);
  border-radius: 14px;

  padding: 0 16px;

  @media screen and (max-width: 767px) {
    height: 65px;
  }
`

export const NavWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`

export const NavIcons = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`

export const NavIconButton = styled.button`
  background: transparent;
  border: none;
  font-size: 22px;
  color: #1e40af;
  cursor: pointer;
`

export const WebsiteLogo = styled.img`
  height: 160px;
  width: 160px;
  margin: -120px 0px;
  outline: none;

  @media screen and (max-width: 767px) {
    height: 130px;
    width: 130px;
    margin: -52px -30px;
  }
`
