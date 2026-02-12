import styled from 'styled-components'

export const WishlistContainer = styled.div`
  min-height: 100vh;
  max-width: 1100px;
  margin: auto;

  padding: 80px 16px 140px;

  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: 768px) {
    padding: 100px 24px;
  }
`

export const WishlistHeading = styled.h1`
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

export const WishlistList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  display: flex;
  flex-direction: column;
  gap: 16px;
`
export const WishlistActionBar = styled.div`
  width: fit-content;
  margin-top: 32px;
  padding: 16px;
  background-color: #ffffff;
  border-radius: 14px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);

  display: flex;
  gap: 12px;

  @media (min-width: 768px) {
    position: static;
  }

  @media (max-width: 767px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 16px 16px 0 0;
    justify-content: space-around;
    z-index: 100;
  }
`

export const ActionButton = styled.button`
  padding: 12px 16px;
  border-radius: 10px;
  border: none;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;

  background-color: ${({ primary }) => (primary ? '#1e40af' : '#e5e7eb')};
  color: ${({ primary }) => (primary ? '#ffffff' : '#1f2933')};

  ${({ danger }) =>
    danger &&
    `
    background-color: #fee2e2;
    color: #b91c1c;
  `}

  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }

  &:active {
    transform: translateY(0);
  }
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
