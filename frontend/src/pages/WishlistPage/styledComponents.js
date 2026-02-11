import styled from 'styled-components'

export const WishlistContainer = styled.div`
  padding: 80px 12px;
  max-width: 900px;
  margin: 0 auto;
`

export const WishlistHeading = styled.h1`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`

export const WishlistList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;

  display: flex;
  flex-direction: column;
  gap: 12px;
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
