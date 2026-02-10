import styled from 'styled-components'

export const Page = styled.div`
  padding: 80px 12px;
  display: flex;
  justify-content: center;
`

export const Card = styled.div`
  width: 100%;
  max-width: 900px;
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    padding: 8px;
  }
`

export const ImageSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ProductImage = styled.img`
  width: 100%;
  max-width: 260px;
  border-radius: 8px;
  object-fit: cover;

  @media (max-width: 768px) {
    max-width: 220px;
  }
`

export const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media screen and (min-width: 769px) {
    gap: 12px;
    padding-top: 10px;
  }
`

export const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`

export const Brand = styled.p`
  font-size: 15px;
  color: #555;

  span {
    font-weight: 500;
  }

  @media (max-width: 768px) {
    font-size: 13px;
  }
`

export const Rating = styled.p`
  font-size: 15px;
  color: #ff9800;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`

export const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media screen and (min-width: 769px) {
    gap: 12px;
  }
`

export const DiscountPrice = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: #2e7d32;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`

export const OriginalPrice = styled.del`
  font-size: 15px;
  color: #888;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`

export const Description = styled.p`
  max-width: 400px;
  font-size: 14px;
  line-height: 1.5;
  color: #444;

  @media (max-width: 768px) {
    font-size: 13px;
  }

  @media screen and (min-width: 1024px) {
    max-width: 460px;
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 6px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const AddToCartButton = styled.button`
  width: 120px;
  padding: 10px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  background: linear-gradient(90deg, #2563eb, #1e40af);
  color: #fff;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const BuyNowButton = styled.button`
  width: 120px;
  padding: 10px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 6px;
  border: 2px solid #2563eb;
  background: transparent;
  color: #2563eb;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`
export const LoaderContainer = styled.div`
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const FailureContainer = styled.div`
  min-height: 70vh;
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
