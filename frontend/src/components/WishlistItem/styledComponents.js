import styled from 'styled-components'

export const Item = styled.li`
  display: flex;
  gap: 14px;
  padding: 12px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    gap: 10px;
  }
`

export const ItemImage = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 6px;
  object-fit: cover;

  @media (max-width: 768px) {
    width: 70px;
    height: 70px;
  }
`

export const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`

export const ItemTitle = styled.h1`
  font-size: 15px;
  font-weight: 600;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`

export const ItemPrice = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #2e7d32;
`

export const ActionRow = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 6px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const MoveToCartButton = styled.button`
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  background: linear-gradient(90deg, #2563eb, #1e40af);
  color: white;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`

export const RemoveButton = styled.button`
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 6px;
  border: 1px solid #e11d48;
  background: transparent;
  color: #e11d48;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`
