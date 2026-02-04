import styled from 'styled-components'

export const ItemContainer = styled.li`
  display: flex;
  gap: 16px;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`

export const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: contain;
`

export const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const Title = styled.h3`
  font-size: 16px;
  margin: 0 0 6px;
`

export const Price = styled.p`
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 10px;
`

export const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

export const QtyButton = styled.button`
  padding: 4px 10px;
  font-size: 16px;
  cursor: pointer;
`

export const QtyText = styled.span`
  font-size: 14px;
  font-weight: 600;
`

export const RemoveButton = styled.button`
  margin-top: 10px;
  background: transparent;
  border: none;
  color: #d11a2a;
  cursor: pointer;
  align-self: flex-start;
`
