import styled from 'styled-components'

export const MainContainer = styled.div`
  min-height: 100vh;
  background-color: #f7f8fc;
  display: flex;
  flex-direction: column;
`
/* Header */

export const Navbar = styled.nav`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;

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

  @media (max-width: 768px) {
    display: none;
  }
`

export const SectionWrapper = styled.div`
  flex: 1;
  background: linear-gradient(90deg, #4a86e7 0%, #3ac4e7 100%);
  display: flex;
  flex-direction: column;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  margin-top: -6px;

  @media screen and (min-width: 768px) {
    background: #ffffff;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
  }
`
/* Hero Section */

export const HeroSection = styled.div`
  height: 40%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #ffffff;
  text-align: center;
  padding: 20px;

  @media screen and (min-width: 768px) {
    height: 300px;
    background: linear-gradient(160deg, #3a82e7 0%, #2fbeea 55%, #7de7ff 100%);
    backdrop-filter: blur(2px);
    flex-direction: row;
    justify-content: space-between;
    padding: 30px 90px;
  }
`
export const HeroImage = styled.img`
  height: 200px;
  width: 200px;
  margin: -40px;

  @media screen and (min-width: 768px) {
    display: none;
  }
`

export const HeroDesktopImage = styled.img`
  height: 400px;
  width: 450px;
  margin: -30px -30px 0px 0px;
  z-index: -1;
  pointer-events: none;

  @media screen and (max-width: 768px) {
    display: none;
  }
`
export const HeroSectionDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  @media screen and (min-width: 768px) {
    align-items: flex-start;
    gap: 15px;
  }
`

export const HeroTitle = styled.h1`
  font-size: 26px;

  @media screen and (min-width: 768px) {
    font-size: 50px;
  }
`
export const HeroSubTitle = styled.p`
  width: 240px;
  font-size: 12px;

  @media screen and (min-width: 768px) {
    width: auto;
    font-size: 20px;
  }
`
export const HeroButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    gap: 25px;
  }
`

export const HeroButton = styled.button`
  background: linear-gradient(
    135deg,
    #0636b0 0%,
    #0d4ccf 35%,
    #0070ea 75%,
    #0098f7 100%
  );
  color: #ffffff;
  padding: 12px 26px;
  font-size: 12px;
  font-weight: 500;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  transition: 0.25s ease-in-out;

  &:hover {
    background-color: #002f63;
  }
  @media screen and (min-width: 768px) {
    font-size: 13px;
  }
`
export const HeroLink = styled.a`
  font-size: 12px;
  font-weight: 400;
  text-decoration: none;
  margin-top: 10px;
  display: inline-block;
  opacity: 0.9;
  cursor: pointer;
  margin-top: 3px;
  transition: 0.2s ease-in-out;

  &:hover {
    opacity: 1;
    text-decoration: underline;
  }

  @media screen and (min-width: 768px) {
    font-size: 13px;
  }
`
/* Features Section */

export const FeaturesSection = styled.div`
  height: 50%;
  width: 100%;
  background-color: #f7f8fc;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  padding: 20px;

  @media screen and (min-width: 768px) {
    width: 85%;
    background-color: #f1f2f6ff;
    align-self: center;
    margin-top: -30px;
    margin-bottom: -30px;
    z-index: 11;
    border-radius: 25px;
  }
`
export const SectionHeading = styled.h2`
  color: #262626;
  font-size: 18px;
  align-self: flex-start;

  @media screen and (min-width: 768px) {
    display: none;
  }
`

export const FeaturesList = styled.ul`
  width: 100%;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  gap: 15px;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
`
/* Testimonial Section */

export const TestimonialSection = styled.div`
  width: 100%;
  background-color: #c7f2feff;
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 4px 18px rgba(0, 0, 0, 0.08);

  @media screen and (min-width: 768px) {
    width: 1230px;
    padding: 15px;
  }
`
export const TestimonialAvatar = styled.img`
  min-height: 40px;
  min-width: 40px;
  max-height: 50px;
  max-width: 50px;
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

  @media screen and (min-width: 768px) {
    display: none;
  }
`
export const TestimonialDescription = styled.p`
  color: #323131ff;
  font-size: 12px;
  font-weight: 600;

  @media screen and (min-width: 768px) {
    font-size: 16px;
  }
`
export const TestimonialSubtext = styled.p`
  color: #525252;
  font-size: 12px;

  @media screen and (min-width: 768px) {
    font-size: 13px;
  }
`
export const ProfileName = styled.span`
  color: #1e88e5;
  font-size: 12px;
  font-weight: 500;

  @media screen and (min-width: 768px) {
    font-size: 13px;
  }
`
/* Footer */

export const Footer = styled.footer`
  width: 100%;
  background: #ffffff;
  text-align: center;
  padding: 12px 0;
  font-size: 12px;
  color: #6b7280; /* subtle text */
  border-top: 1px solid #e5e7eb; /* light gray top border */

  @media screen and (min-width: 768px) {
    width: 85%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: center;
    z-index: 10;
    padding-top: 42px;
  }
`

export const FooterText = styled.p`
  margin: 8px 0;
  font-weight: 500;

  a {
    margin: 0 4px;
    color: #6b7280;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
      color: #111827;
      transition: 0.2s;
    }
  }
  @media screen and (min-width: 768px) {
    font-size: 14px;
  }
`

export const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 14px;
  margin-top: 8px;
`

export const SocialIcon = styled.div`
  color: #1e88e5;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    transform: scale(1.12);
    transition: 0.2s ease-in-out;
  }
  @media screen and (min-width: 768px) {
    font-size: 25px;
  }
`
