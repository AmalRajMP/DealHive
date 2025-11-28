import { useNavigate } from 'react-router-dom'

import Logo from '../../assets/Logo.png'

import {
  MainContainer,
  Navbar,
  WebsiteLogo,
  AuthContainer,
  AuthButton,
} from './styledComponents'

const LandingPage = () => {
  const navigate = useNavigate()

  const goToLogin = () => {
    navigate('/login')
  }
  return (
    <MainContainer>
      <Navbar>
        <WebsiteLogo src={Logo} alt="website-logo" />
        <AuthContainer>
          <AuthButton color="#525252" onClick={goToLogin}>
            Login
          </AuthButton>
        </AuthContainer>
      </Navbar>
    </MainContainer>
  )
}

export default LandingPage
