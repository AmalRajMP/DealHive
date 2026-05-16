import styled from 'styled-components'

export const CartContainer = styled.div`
  height: 100vh;
  max-width: 1100px;
  margin: 0 auto;
  padding: 100px 24px 60px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 25px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 90px 16px 120px;
  }
`

export const CartHeading = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 10px;
  padding-bottom: 6px;
  border-bottom: 2px solid #e2e8f0;
  color: #1f2933;

  grid-column: 1 / -1;
`

export const CartList = styled.ul`
  height: 500px;
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;

  /* scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }

  @media (max-width: 768px) {
    height: 450px;
    padding-bottom: 10px;

    &::-webkit-scrollbar {
      width: 3px;
    }
  }
`

export const OrderSummary = styled.div`
  background-color: #ffffff;
  border-radius: 14px;
  padding: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);

  display: flex;
  flex-direction: column;
  gap: 16px;

  position: sticky;
  top: 100px;
  height: fit-content;

  @media (max-width: 768px) {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    align-self: flex-end;
    border-radius: 16px 16px 0 0;
    padding: 16px 20px;
  }
`

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const SummaryLabel = styled.p`
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
`

export const SummaryValue = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: #0f172a;
`

export const CheckoutButton = styled.button`
  margin-top: 8px;
  padding: 14px;
  background: linear-gradient(135deg, #1e40af, #2563eb);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(37, 99, 235, 0.35);
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
  width: 220px;
`

export const FailureText = styled.p`
  font-size: 16px;
  color: #475569;
  text-align: center;
`

export const RetryButton = styled.button`
  padding: 10px 18px;
  background-color: #1e40af;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-weight: 500;
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
  text-align: center;
  font-size: 16px;
`

export const EmptyImage = styled.img`
  width: 220px;
`
