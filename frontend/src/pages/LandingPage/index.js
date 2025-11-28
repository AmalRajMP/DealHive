import { useNavigate } from 'react-router-dom'

import Logo from '../../assets/Logo.png'
import CartImage from '../../assets/CartImage.png'

import {
  MainContainer,
  Navbar,
  WebsiteLogo,
  AuthContainer,
  AuthButton,
  SectionWrapper,
  HeroSection,
  HeroImage,
  HeroTitle,
  HeroSubTitle,
  HeroButton,
  HeroLink,
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
      <SectionWrapper>
        <HeroSection>
          <HeroImage src={CartImage} alt="cart" />
          <HeroTitle>Shop Smarter With AI</HeroTitle>
          <HeroSubTitle>
            Personalized deals and recommendations for every shopper.
          </HeroSubTitle>
          <HeroButton>Get Started</HeroButton>
          <HeroLink>Learn More</HeroLink>
        </HeroSection>
      </SectionWrapper>
    </MainContainer>
  )
}

export default LandingPage
