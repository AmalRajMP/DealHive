import styled from 'styled-components'

export const ProductCard = styled.div`
  min-width: 155px;
  max-width: 155px;

  background-color: #ffffff;
  border-radius: 14px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 6px 18px rgba(30, 64, 175, 0.08);
  box-sizing: border-box;
`

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 120px;
  border-radius: 10px;
  background-color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
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
`

export const OriginalPrice = styled.span`
  font-size: 11px;
  color: #94a3b8;
  text-decoration: line-through;
`
