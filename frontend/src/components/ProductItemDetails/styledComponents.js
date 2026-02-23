import styled from 'styled-components'

export const Page = styled.div`
  padding: 80px 15px 10px 15px;
  display: flex;
  justify-content: center;
`

export const Card = styled.div`
  max-width: 900px;
  display: flex;
  gap: 20px;
  margin-bottom: 6px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
    padding: 8px;
  }
`

export const ImageSection = styled.div`
  position: relative;
  width: 260px;
  height: 260px;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 220px;
    height: 220px;
    margin: 0 auto;
  }
`

export const ProductImage = styled.img`
  height: 100%;
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
  justify-content: center;

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

export const WishlistButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;

  background: rgb(255, 255, 255);
  border: none;
  border-radius: 50%;
  padding: 6px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

  &:hover {
    transform: scale(1.05);
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
export const RecommendationLoaderBox = styled.div`
  width: 100%;
  min-height: 170px;
  margin: 10px 0 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: relative;
  animation: fadeIn 0.5s ease;

  /* soft ambient glow */
  &::before {
    content: '';
    position: absolute;
    inset: -40px;
    background: radial-gradient(
      circle,
      rgba(37, 99, 235, 0.12),
      rgba(37, 99, 235, 0.05) 40%,
      transparent 75%
    );
    filter: blur(25px);
    z-index: -1;
  }

  /* edge blending mask */
  -webkit-mask-image: radial-gradient(circle, black 70%, transparent 100%);
  mask-image: radial-gradient(circle, black 70%, transparent 100%);

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`
export const LoaderTitle = styled.p`
  margin-top: 14px;
  font-size: 16px;
  font-weight: 600;
  color: #1e40af;
`

export const LoaderSub = styled.span`
  font-size: 13px;
  color: #3b82f6;
  margin-top: 4px;
`
export const Section = styled.div`
  margin-top: 32px;
`

export const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #1e293b;
`

export const ReviewCard = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid #e2e8f0;
`

export const ReviewerName = styled.p`
  font-weight: 600;
  margin-bottom: 4px;
`

export const ReviewRating = styled.p`
  font-size: 14px;
  color: #f59e0b;
  margin-bottom: 4px;
`

export const ReviewComment = styled.p`
  font-size: 14px;
  color: #475569;
`

export const ServiceList = styled.ul`
  padding-left: 18px;
`

export const ServiceItem = styled.li`
  font-size: 14px;
  color: #334155;
  margin-bottom: 6px;
`

export const ProductLayout = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;
  flex-wrap: wrap;
`

export const ReviewSectionWrapper = styled.div`
  flex: 1;
  min-width: 280px;
`
