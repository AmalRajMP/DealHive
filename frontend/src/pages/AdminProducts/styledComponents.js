import styled from 'styled-components'

export const Container = styled.div`
  padding: 20px;
`

export const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`

export const Card = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Info = styled.div``

export const ProductTitle = styled.h4`
  margin: 0;
`

export const Price = styled.p`
  margin: 5px 0 0 0;
  color: #6b7280;
`

export const DeleteBtn = styled.button`
  background: #ef4444;
  border: none;
  color: white;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #dc2626;
  }
`
export const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 15px;
`

export const Left = styled.div`
  display: flex;
  align-items: center;
`

export const Category = styled.p`
  margin: 4px 0 0 0;
  font-size: 13px;
  color: #9ca3af;
`
