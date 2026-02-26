import styled from 'styled-components'

export const Container = styled.div`
  padding: 30px;
  background: #f8fafc;
  min-height: 100vh;
`

export const Title = styled.h2`
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
`

export const Card = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 24px 28px;
  margin-bottom: 24px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
  }
`

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const OrderId = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #0f172a;
`

export const SmallText = styled.p`
  margin: 4px 0;
  font-size: 12px;
  color: #64748b;
`

export const Status = styled.span`
  font-size: 12px;
  font-weight: 600;
  padding: 6px 14px;
  border-radius: 999px;
  background-color: #fef3c7;
  color: #92400e;
`

export const Section = styled.div`
  margin: 16px 0;
`

export const Strong = styled.span`
  font-weight: 600;
  margin-right: 6px;
  color: #0f172a;
`

export const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;

  &:last-child {
    border-bottom: none;
  }
`
export const Total = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const TotalLabel = styled.span`
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
  letter-spacing: 0.5px;
`

export const TotalAmount = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #111827;
`
export const QuantityBadge = styled.span`
  background-color: #e2e8f0;
  color: #334155;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  margin-left: 10px;
`
export const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
`
export const StatusSelect = styled.select`
  padding: 8px 14px;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
  background-color: #f8fafc;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: #2563eb;
    background-color: #ffffff;
  }
`
