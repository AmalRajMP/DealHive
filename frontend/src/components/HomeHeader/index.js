import { useNavigate } from 'react-router-dom'

import Website_Logo from '../../assets/Website_Logo.png'

import {
  Navbar,
  WebsiteLogo,
  AuthContainer,
  LoginButton,
  SignUpButton,
} from './styledComponents'

const HomeHeader = () => {
  const navigate = useNavigate()

  const goToLogin = () => {
    navigate('/login')
  }

  const goToRegiter = () => {
    navigate('/register')
  }
  return (
    <Navbar>
      <WebsiteLogo src={Website_Logo} alt="website-logo" />
      <AuthContainer>
        <LoginButton onClick={goToLogin}>Login</LoginButton>
        <SignUpButton onClick={goToRegiter}>Sign Up</SignUpButton>
      </AuthContainer>
    </Navbar>
  )
}

export default HomeHeader
