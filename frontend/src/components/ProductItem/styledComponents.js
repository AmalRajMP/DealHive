import styled from 'styled-components'

export const ProductCard = styled.div`
  width: 160px;
  flex-shrink: 0;
  background-color: #ffffff;
  border-radius: 14px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 6px 18px rgba(30, 64, 175, 0.08);
  box-sizing: border-box;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 22px rgba(30, 64, 175, 0.12);
  }

  @media screen and (min-width: 768px) {
    width: 175px;
  }

  @media screen and (min-width: 1024px) {
    width: 190px;
  }
`

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 125px;
  border-radius: 10px;
  background-color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;

  @media screen and (min-width: 1024px) {
    height: 145px;
  }
`

export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

export const DiscountBadge = styled.span`
  position: absolute;
  top: 6px;
  left: 6px;
  background-color: #1e40af;
  color: #ffffff;
  font-size: 10px;
  font-weight: 600;
  padding: 3px 6px;
  border-radius: 6px;
`

export const AIPickBadge = styled.span`
  position: absolute;
  top: 6px;
  right: 6px;
  background: linear-gradient(135deg, #2563eb, #60a5fa);
  color: #ffffff;
  font-size: 10px;
  font-weight: 600;
  padding: 3px 7px;
  border-radius: 999px;
`

export const ProductTitle = styled.p`
  font-size: 13px;
  font-weight: 500;
  color: #0f172a;
  margin: 4px 0 6px 0;
  line-height: 1.35;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media screen and (min-width: 1024px) {
    font-size: 14px;
  }
`

export const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`

export const DiscountPrice = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #1e40af;

  @media screen and (min-width: 1024px) {
    font-size: 15px;
  }
`

export const OriginalPrice = styled.span`
  font-size: 11px;
  color: #94a3b8;
  text-decoration: line-through;

  @media screen and (min-width: 1024px) {
    font-size: 12px;
  }
`
