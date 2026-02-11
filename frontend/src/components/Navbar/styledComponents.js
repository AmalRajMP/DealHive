import styled from 'styled-components'

export const Navbar = styled.nav`
  width: 100%;
  height: 70px;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #f8fbff;
  box-shadow: 0 2px 8px rgba(94, 169, 250, 0.15);

  @media (max-width: 767px) {
    height: 65px;
  }
`

export const NavWrapper = styled.div`
  width: 100%;
  max-width: 1200px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 20px;

  @media (max-width: 767px) {
    padding: 0 20px;
  }
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
    margin: -52px -20px;
  }
`

/* Greeting shown ONLY on desktop */
export const Greeting = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  @media (max-width: 768px) {
    display: none;
  }
`

export const GreetingIcon = styled.div`
  color: #1e40af;
  font-size: 18px;
`

export const GreetingText = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #1e40af;
  margin: 0;
`

export const NavIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

export const NavIconButton = styled.button`
  background: transparent;
  border: none;
  font-size: 22px;
  color: #1e40af;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`

export const LogoutButton = styled.button`
  background: linear-gradient(135deg, #1e3a8a, #2563eb);
  color: white;
  border: none;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  cursor: pointer;

  display: flex;
  align-items: center;
  gap: 6px;

  .logout-icon {
    display: none;
    font-size: 22px;
  }

  @media (max-width: 767px) {
    background: transparent;
    padding: 4px;

    .logout-text {
      display: none;
    }

    .logout-icon {
      display: block;
      color: #2563eb;
    }
  }
`
