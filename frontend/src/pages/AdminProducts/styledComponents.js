import styled from 'styled-components'

export const Container = styled.div`
  padding: 20px;
`

export const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`
export const AddBtn = styled.button`
  background: #2563eb;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;

  font-weight: 500;

  &:hover {
    background: #1d4ed8;
  }
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
export const EditBtn = styled.button`
  background: #2563eb;
  border: none;
  color: white;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background: #1d4ed8;
  }
`

export const Actions = styled.div`
  display: flex;
  align-items: center;
`
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ModalBox = styled.div`
  background: white;
  padding: 25px;
  border-radius: 12px;
  width: 350px;
`

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
`

export const SaveBtn = styled.button`
  background: #16a34a;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
`
export const SearchInput = styled.input`
  width: 320px;
  padding: 10px 14px;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
  }
`
export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
`
export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`
