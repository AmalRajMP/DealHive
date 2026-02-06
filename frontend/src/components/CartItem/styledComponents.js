import styled from 'styled-components'

export const ItemContainer = styled.li`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  margin-bottom: 16px;

  @media (max-width: 480px) {
    gap: 12px;
    padding: 12px;
  }
`

export const ItemImage = styled.img`
  width: 96px;
  height: 96px;
  object-fit: contain;
  border-radius: 8px;
  background-color: #f9fafb;

  @media (max-width: 480px) {
    width: 80px;
    height: 80px;
  }
`

export const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const Title = styled.h3`
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 6px;
  color: #1f2933;

  @media (max-width: 480px) {
    font-size: 15px;
  }
`

export const Price = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: #0f172a;
  margin: 0 0 12px;
`

export const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const QtyButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  background-color: #f9fafb;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    background-color: #e5e7eb;
  }
`

export const QtyText = styled.span`
  font-size: 14px;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
`

export const RemoveButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #b91c1c;
  }
`
