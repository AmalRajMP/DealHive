import styled, { keyframes, css } from "styled-components"

const shimmer = keyframes`
  from {
    background-position: -200% 0;
  }

  to {
    background-position: 200% 0;
  }
`
const shimmerStyles = css`
  background: linear-gradient(90deg, #e5e7eb 25%, #f8fafc 50%, #e5e7eb 75%);
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
`

export const ProductCard = styled.div`
  width: 160px;
  min-height: 220px;
  flex-shrink: 0;
  border-radius: 16px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 20px rgba(30, 64, 175, 0.08);

  @media (min-width: 768px) {
    width: 200px;
    min-height: 240px;
  }

  @media (min-width: 1200px) {
    width: 220px;
    min-height: 260px;
  }
`

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 135px;
  border-radius: 12px;
  background-color: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;

  @media (min-width: 1200px) {
    height: 150px;
  }
`

export const ProductImage = styled.div`
  width: 85%;
  height: 85%;
  ${shimmerStyles}
  border-radius: 8px;
`

export const ProductTitle = styled.div`
  height: 38px;
  width: 75%;
  ${shimmerStyles}
  border-radius: 4px;
  margin-bottom: 8px;
`

export const ExplanationText = styled.div`
  height: 28px;
  width: 50%;
  ${shimmerStyles}
  border-radius: 4px;
  margin-bottom: 12px;
`

export const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
`

export const DiscountPrice = styled.div`
  height: 22px;
  width: 60px;
  ${shimmerStyles}
  border-radius: 4px;

  @media screen and (min-width: 1024px) {
    height: 26px;
    width: 62px;
  }
`

export const OriginalPrice = styled.div`
  height: 20px;
  width: 45px;
  ${shimmerStyles}
  border-radius: 4px;

  @media screen and (min-width: 1024px) {
    height: 22px;
    width: 50px;
  }
`
