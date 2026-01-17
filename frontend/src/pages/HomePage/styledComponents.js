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
  outline: none; /* ✅ fixed syntax */
`

export const SearchbarWrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
  color: #000000;
  margin: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  padding: 6px 20px;
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
  width: 100%;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
`

// Banner
export const Banner = styled.div`
  height: 200px;
  background: linear-gradient(135deg, #25c0eb, #5b9aff);
  border-radius: 20px;
  padding: 28px 20px;
  margin: 16px;
  color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: space-between;

  /* NEW: Full width on large screens */
  width: 100%;
  max-width: 1200px; /* keeps content nicely contained */
  margin-left: auto;
  margin-right: auto;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    text-align: center;
    max-width: 100%; /* full width on mobile */
  }
`

export const BannerLeft = styled.div`
  max-width: 500px; /* slightly wider for large screens */
`

export const BannerTitle = styled.h1`
  font-size: 22px;
  margin: 0;
  font-weight: 700;

  @media screen and (min-width: 1024px) {
    font-size: 28px;
  }
`

export const BannerSubtitle = styled.p`
  font-size: 13px;
  margin: 8px 0 18px;
  opacity: 0.9;
`

export const BannerButton = styled.button`
  background-color: #ffffff;
  color: #4f46e5;
  border: none;
  padding: 10px 22px;
  border-radius: 22px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`

export const BannerRight = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 767px) {
    display: none;
  }
`

export const BannerIcon = styled.img`
  width: 200px;
  opacity: 0.9;
`
