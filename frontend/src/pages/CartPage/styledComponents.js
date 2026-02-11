import styled from 'styled-components'

export const CartContainer = styled.div`
  min-height: 100vh;
  padding: 80px 24px;
  max-width: 900px;
  margin: auto;
`
export const CartHeading = styled.h1`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e2e8f0;
  color: #1f2933;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 20px;
  }

  @media (max-width: 480px) {
    font-size: 20px;
    margin-bottom: 16px;
    padding-bottom: 10px;
  }
`

export const CartList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const EmptyView = styled.p`
  min-height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 18px;
  font-weight: 500;
  color: #555;
`
