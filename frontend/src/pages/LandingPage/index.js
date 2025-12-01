import { useNavigate } from 'react-router-dom'

import FeatureItem from '../../components/FeatureItem'

import Logo from '../../assets/Logo.png'
import CartImage from '../../assets/CartImage.png'
import Testimonial_Avatar from '../../assets/Testimonial_Avatar.jpg'

import { FiSearch } from 'react-icons/fi'
import { BiBrain } from 'react-icons/bi'
import { AiFillStar } from 'react-icons/ai'

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
      </SectionWrapper>
    </MainContainer>
  )
}

export default LandingPage
