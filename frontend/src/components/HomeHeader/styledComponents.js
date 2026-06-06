import styled from "styled-components"

export const Navbar = styled.nav`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  background-color: #f8fbff;
  box-shadow: 0 2px 8px rgba(94, 169, 250, 0.15);
  border-radius: 14px;
  padding: 0 16px;

  @media (max-width: 768px) {
    height: 55px;
    padding: 0px 15px 0px 0px;
  }
`

export const WebsiteLogo = styled.img`
  height: 160px;
  width: auto;
  margin-top: -10px;
  object-fit: contain;

  @media (max-width: 768px) {
    height: 120px;
  }
`

export const AuthContainer = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 25px;
  }
`
export const LoginButton = styled.button`
  background-color: transparent;
  color: #4a86e7ff;
  font-size: 15px;
  font-weight: 500;
  border-width: 0px;
  margin-top: -10px;
  cursor: pointer;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`
export const SignUpButton = styled.button`
  background: linear-gradient(90deg, #4a86e7 0%, #3ac4e7 100%);
  color: #ffffff;
  font-size: 15px;
  font-weight: 500;
  border-width: 0px;
  margin-top: -10px;
  border-radius: 25px;
  padding: 8px 16px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`
