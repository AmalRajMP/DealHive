import { useNavigate } from 'react-router-dom'

import FeatureItem from '../../components/FeatureItem'

import Website_Logo from '../../assets/Website_Logo.png'
import CartImage from '../../assets/CartImage.png'
import Testimonial_Avatar from '../../assets/Testimonial_Avatar.jpg'

import { FiSearch } from 'react-icons/fi'
import { BiBrain } from 'react-icons/bi'
import { AiFillStar } from 'react-icons/ai'
import { FaRegCopyright } from 'react-icons/fa'
import { FaFacebook } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'

import {
  MainContainer,
  Navbar,
  WebsiteLogo,
  AuthContainer,
  LoginButton,
  SignUpButton,
  SectionWrapper,
  HeroSection,
  HeroImage,
  HeroTitle,
  HeroSubTitle,
  HeroButton,
  HeroLink,
  FeaturesSection,
  FeaturesList,
  SectionHeading,
  TestimonialSection,
  TestimonialAvatar,
  TestimonialDetails,
  TestimonialName,
  TestimonialDescription,
  TestimonialSubtext,
  ProfileName,
  Footer,
  FooterText,
  SocialLinks,
  SocialIcon,
} from './styledComponents'

const featuresList = [
  {
    id: 1,
    icon: <FiSearch />,
    title: 'Smart Search',
    description: 'Find products instantly',
  },
  {
    id: 2,
    icon: <BiBrain />,
    title: 'AI Recommendations',
    description: 'Smarter choices every day',
  },
  {
    id: 3,
    icon: <AiFillStar />,
    title: 'Personalized Deals',
    description: 'Offers tailored for you',
  },
]

const LandingPage = () => {
  const navigate = useNavigate()

  const goToLogin = () => {
    navigate('/login')
  }
  return (
    <MainContainer>
      <Navbar>
        <WebsiteLogo src={Website_Logo} alt="website-logo" />
        <AuthContainer>
          <LoginButton onClick={goToLogin}>
            Login
          </LoginButton>
           <SignUpButton onClick={goToLogin}>
            Sign Up
          </SignUpButton>
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
        <FeaturesSection>
          <SectionHeading>Features</SectionHeading>
          <FeaturesList>
            {featuresList.map((eachItem) => (
              <FeatureItem key={eachItem.id} featureDetails={eachItem} />
            ))}
          </FeaturesList>
          <SectionHeading>Testimonial</SectionHeading>
          <TestimonialSection>
            <TestimonialAvatar
              src={Testimonial_Avatar}
              alt="testimonial avatar"
            />
            <TestimonialDetails>
              <TestimonialName>Sarah K</TestimonialName>
              <TestimonialDescription>
                DealHive changed how I shop! save much
              </TestimonialDescription>
              <TestimonialSubtext>
                <ProfileName>--Sarra K</ProfileName>, Frequent Shopper
              </TestimonialSubtext>
            </TestimonialDetails>
          </TestimonialSection>
        </FeaturesSection>
        <Footer>
          <FooterText>
            <FaRegCopyright />
            2025 DealHive | Terms of Service | Contact Us
          </FooterText>

          <SocialLinks>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon>
                <FaFacebook />
              </SocialIcon>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SocialIcon>
                <FaInstagram />
              </SocialIcon>
            </a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">
              <SocialIcon>
                <FaSquareXTwitter />
              </SocialIcon>
            </a>
          </SocialLinks>
        </Footer>
      </SectionWrapper>
    </MainContainer>
  )
}

export default LandingPage
