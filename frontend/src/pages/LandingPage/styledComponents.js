import styled from 'styled-components'

export const MainContainer = styled.div`
  min-height: 100vh;
  background-color: #f7f8fc;
  display: flex;
  flex-direction: column;
`
export const Navbar = styled.nav`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 15px 0px 15px;
`
export const WebsiteLogo = styled.img`
  height: 90px;
  min-width: 110px;
  max-width: 200px;
  margin-top: -15px;
  padding: 0px;
`
export const AuthContainer = styled.div`
  display: flex;
  gap: 20px;
`
export const AuthButton = styled.button`
  background-color: transparent;
  color: #4a86e7ff;
  font-size: 14px;
  font-weight: 500;
  border-width: 0px;
  margin-top: -20px;
`
export const SectionWrapper = styled.div`
  flex: 1;
  background: linear-gradient(180deg, #1e88e5 0%, #42a5f5 50%, #e3f2fd 100%);
  display: flex;
  flex-direction: column;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  margin-top: -6px;
`
/* Hero Section */

export const HeroSection = styled.div`
  min-height: 40%;
  max-height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #ffffff;
  text-align: center;
  padding: 20px;
`
export const HeroImage = styled.img`
  height: 200px;
  width: 200px;
  margin: -40px;
`
export const HeroTitle = styled.h1`
  font-size: 26px;
`
export const HeroSubTitle = styled.p`
  width: 240px;
  font-size: 12px;
`
export const HeroButton = styled.button`
  background-color: #003a79;
  color: #ffffff;
  padding: 12px 26px;
  font-size: 13px;
  font-weight: 500;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: 0.25s ease-in-out;

  &:hover {
    background-color: #002f63; /* Slightly darker shade */
  }
`
export const HeroLink = styled.a`
  font-size: 12px;
  font-weight: 400;
  text-decoration: none;
  margin-top: 10px;
  display: inline-block; /* ensures margin-top applies properly */
  opacity: 0.9;
  cursor: pointer;
  margin-top: 3px;
  transition: 0.2s ease-in-out;

  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
`
/* Features Section */

export const FeaturesSection = styled.div`
  height: 50%;
  width: 100%;
  background-color: #f7f8fc;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 20px;
`
export const SectionHeading = styled.h2`
  color: #262626;
  font-size: 20px;
`

export const FeaturesList = styled.ul`
  width: 100%;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 15px;
`
/* Testimonial Section */

export const TestimonialSection = styled.div`
  width: 100%;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
`
export const TestimonialAvatar = styled.img`
  height: 40px;
  width: 40px;
  margin-right: 15px;
  border-radius: 50%;
`
export const TestimonialDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
export const TestimonialName = styled.p`
  color: #262626;
  font-size: 12.5px;
  font-weight: 600;
`
export const TestimonialDescription = styled.p`
  color: #262626;
  font-size: 12px;
  font-weight: 600;
`
export const TestimonialSubtext = styled.p`
  color: #525252;
  font-size: 12px;
`
export const ProfileName = styled.span`
  color: #1e88e5;
  font-size: 12px;
  font-weight: 500;
`
