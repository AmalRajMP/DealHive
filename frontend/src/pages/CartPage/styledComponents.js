import styled from 'styled-components'

export const CartContainer = styled.div`
  min-height: 100vh;
  padding: 80px 24px;
  max-width: 900px;
  margin: auto;
`

export const CartHeading = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e2e8f0;
  color: #1f2933;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`

export const CartList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const LoaderContainer = styled.div`
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const FailureContainer = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`

export const FailureImage = styled.img`
  width: 180px;
  max-width: 70%;

  @media (min-width: 768px) {
    width: 200px;
  }

  @media (min-width: 1024px) {
    width: 300px;
  }
`

export const FailureText = styled.p`
  font-size: 14px;
  color: #475569;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 16px;
  }

  @media (min-width: 1024px) {
    font-size: 18px;
  }
`

export const RetryButton = styled.button`
  padding: 8px 16px;
  background-color: #1e40af;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`

export const EmptyView = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  color: #475569;

  font-size: 16px;

  @media (min-width: 768px) {
    font-size: 18px;
  }

  @media (min-width: 1024px) {
    font-size: 20px;
  }
`

export const EmptyImage = styled.img`
  width: 180px;
  max-width: 70%;

  @media (min-width: 768px) {
    width: 200px;
  }

  @media (min-width: 1024px) {
    width: 300px;
  }
`
