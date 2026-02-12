import styled from 'styled-components'

export const MainContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #e8f3ff 0%, #dbeeff 50%, #f5faff 100%);
  display: flex;
  flex-direction: column;

  /* navbar-safe padding */
  padding: 80px 15px 15px 15px;

  @media screen and (max-width: 767px) {
    padding: 80px 8px;
  }
`

export const SearchbarWrapper = styled.div`
  width: 100%;
  max-width: 720px;
  background-color: #ffffff;
  margin: 12px auto;
  display: flex;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  padding: 6px 16px;
  box-shadow: 0px 4px 12px rgba(94, 169, 250, 0.35);

  @media screen and (max-width: 767px) {
    max-width: 100%;
    margin: 10px auto;
  }
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

export const FiltersWrapper = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
  gap: 12px;
  padding: 10px 12px;
  width: 100%;
  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
`

export const Banner = styled.div`
  background: linear-gradient(135deg, #25c0eb, #5b9aff);
  border-radius: 20px;
  padding: 28px 20px;
  margin: 16px auto;
  color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    text-align: center;
    padding: 22px 16px;
  }
`

export const BannerLeft = styled.div`
  max-width: 500px;
`

export const BannerTitle = styled.h1`
  font-size: 26px;
  margin: 0;
  font-weight: 700;

  @media screen and (max-width: 767px) {
    font-size: 20px;
  }
`

export const BannerSubtitle = styled.p`
  font-size: 14px;
  margin: 8px 0 18px;

  @media screen and (max-width: 767px) {
    font-size: 12px;
  }
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
  width: 220px;
  opacity: 0.9;

  @media screen and (max-width: 1023px) {
    width: 180px;
  }
`

export const LoaderContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const FailureContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #1e40af;
`

export const FailureText = styled.p`
  font-size: 16px;
  font-weight: 500;
  margin-top: 8px;
`

export const RetryButton = styled.button`
  margin-top: 14px;
  padding: 8px 16px;
  border-radius: 6px;
  border: none;
  background: linear-gradient(135deg, #2563eb, #1e40af);
  color: white;
  cursor: pointer;
  font-weight: 500;
`
