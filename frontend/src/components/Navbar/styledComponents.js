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
export const Greeting = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  @media screen and (max-width: 640px) {
    gap: 4px;
  }
`
export const GreetingText = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #1e40af;
  margin: 0;
  white-space: nowrap;

  @media screen and (max-width: 768px) {
    font-size: 14px;
  }

  @media screen and (max-width: 640px) {
    display: none;
  }
`
export const GreetingIcon = styled.div`
  display: flex;
  align-items: center;
  color: #1e40af;
  font-size: 18px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }

  @media screen and (max-width: 640px) {
    font-size: 20px;
  }
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
  cursor: pointer;

  @media screen and (max-width: 767px) {
    height: 130px;
    width: 130px;
    margin: -52px -30px;
  }
`
export const LogoutButton = styled.button`
  background: linear-gradient(135deg, #1e3a8a, #2563eb, #3b82f6);
  color: #ffffff;
  border: none;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;
  margin-left: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 0 8px rgba(37, 99, 235, 0.6);
  transition: all 0.3s ease;

  .logout-icon {
    display: none;
    font-size: 16px;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 0 12px rgba(37, 99, 235, 0.9);
  }

  @media screen and (max-width: 767px) {
    background: transparent;
    box-shadow: none;
    padding: 4px;

    .logout-text {
      display: none;
    }

    .logout-icon {
      display: block;
      color: #3b82f6;
      font-size: 18px;
    }

    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
`
