import styled from 'styled-components'

export const Item = styled.li`
  display: flex;
  gap: 16px;
  padding: 16px;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);

  max-width: 700px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    gap: 12px;
    padding: 14px;
  }
`

export const ItemImage = styled.img`
  width: 96px;
  height: 96px;
  border-radius: 10px;
  object-fit: cover;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 64px;
    height: 64px;
  }
`

export const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const ItemTitle = styled.h1`
  font-size: 16px;
  font-weight: 600;
  color: #1f2933;
  margin-bottom: 4px;
  line-height: 1.3;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`

export const ItemPrice = styled.p`
  font-size: 15px;
  font-weight: 700;
  color: #15803d;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`

export const ActionRow = styled.div`
  display: flex;
  gap: 10px;
  max-width: 420px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`

export const MoveToCartButton = styled.button`
  padding: 8px 14px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  border: none;
  border-radius: 6px;
  background-color: #2563eb;
  color: #ffffff;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #1e40af;
  }
`

export const RemoveButton = styled.button`
  padding: 8px 14px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1;
  border-radius: 6px;
  border: 1px solid #e11d48;
  background: transparent;
  color: #e11d48;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background-color: #fff1f2;
  }

  @media (min-width: 769px) {
      padding: 9px 16px;
  }
`
