import styled from 'styled-components'

export const ProductCard = styled.div`
  width: 170px;
  min-height: 220px;
  flex-shrink: 0;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 20px rgba(30, 64, 175, 0.08);
  transition: all 0.25s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 14px 26px rgba(30, 64, 175, 0.14);
  }

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

  @media (min-width: 1200px) {
    height: 150px;
  }
`

export const ProductImage = styled.img`
  width: 85%;
  height: 85%;
  object-fit: contain;
`

export const DiscountBadge = styled.span`
  position: absolute;
  top: 8px;
  left: 8px;
  background-color: #1e40af;
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 8px;
`

export const AIPickBadge = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  background: linear-gradient(135deg, #2563eb, #60a5fa);
  color: white;
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 999px;
`

export const ProductTitle = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #0f172a;
  margin: 8px 0 2px;
  line-height: 1.35;
  height: 38px;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const WhyText = styled.p`
  font-size: 12px;
  color: #64748b;
  margin: 0 0 10px 0;
  line-height: 1.35;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`
export const FallbackTag = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: #2563eb;
  background: #eff6ff;
  padding: 4px 8px;
  border-radius: 999px;
  width: fit-content;
`

export const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: auto;
`
export const DiscountPrice = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #1e40af;

  @media screen and (min-width: 1024px) {
    font-size: 17px;
  }
`

export const OriginalPrice = styled.span`
  font-size: 13px;
  color: #94a3b8;
  text-decoration: line-through;

  @media screen and (min-width: 1024px) {
    font-size: 13px;
  }
`
