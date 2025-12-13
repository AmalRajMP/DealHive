import styled from 'styled-components'

export const MainContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  background: linear-gradient(180deg, #e8f3ff 0%, #dbeeff 50%, #f5faff 100%);

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`
// Navbar
export const Navbar = styled.nav`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 8px;
`
export const NavWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`
export const WebsiteLogo = styled.img`
  height: 130px;
  width: 130px;
  margin: -50px;
  outline none;
`
export const SearchbarWrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
  color: #000000;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  padding: 6px 20px 6px 20px;
  box-shadow: 0px 4px 12px rgba(94, 169, 250, 0.35);
`
export const SearchIcon = styled.div`
  height: 30px;
  width: 20px;
  color: #005bbaff;
  align-self: center;
  padding-top: 6px;
`
export const SearchInput = styled.input`
  height: 100%;
  width: 100%;
  color: #005bbaff;
  font-size: 14px;
  border: none;
  outline: none;
`
// Filters Section
export const FiltersWrapper = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
  gap: 12px;

  padding: 12px 16px;
  margin-top: 8px;
  margin-bottom: 8px;
  width: 100%;

  white-space: nowrap;

  /* Hide scrollbar on Chrome, Safari, Edge (WebKit browsers) */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar on Firefox */
  scrollbar-width: none;

  /* Hide scrollbar on IE, Edge Legacy */
  -ms-overflow-style: none;
`
export const HeroImage = styled.img`
  height: min(240px, 35vh);
  width: 100%;
  object-fit: cover;
  border-radius: 12px;
  margin-top: 15px;
  margin-bottom: 15px;
  box-shadow: 0px 2px 6px rgba(124, 236, 251, 1);
`
/* Recommendations Section */
export const RecommendationsSection = styled.div`
  width: 100%;
  margin-top: 12px;
  padding: 0 14px;
`

export const RecommendationTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 4px;
`

export const RecommendationExplanation = styled.p`
  font-size: 13px;
  color: #475569;
  margin-bottom: 14px;
  line-height: 1.4;
`
export const ProductsList = styled.div`
  display: flex;
  gap: 12px;
  padding: 4px 2px 10px 2px;

  overflow-x: auto;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
`
