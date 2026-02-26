import styled from 'styled-components'

export const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to right, #f8fafc, #eef2f7);
  padding: 60px 20px;
  display: flex;
  justify-content: center;
`
export const HeaderSection = styled.div`
  text-align: center;
  margin: 20px 0 35px;

  h1 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 6px;
  }

  p {
    font-size: 14px;
    color: #777;
  }
`
export const CheckoutWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
`

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 40px;
`

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.9fr;
  gap: 40px;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const Card = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
export const SummaryCard = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  max-height: 520px;
`
export const ItemsContainer = styled.div`
  overflow-y: auto;
  padding-right: 10px;
`
export const SectionTitle = styled.h3`
  margin-bottom: 25px;
  font-size: 18px;
`

export const ItemRow = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 10px;
  border-radius: 10px;
  transition: 0.2s;

  &:hover {
    background: #f9fafb;
  }
`

export const Image = styled.img`
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 12px;
`

export const ItemDetails = styled.div`
  flex: 1;
`

export const ItemName = styled.p`
  font-weight: 600;
  margin-bottom: 5px;
`
export const QtyText = styled.p`
  font-size: 14px;
  color: #666;
`

export const ItemPrice = styled.p`
  font-weight: 600;
`

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #eee;
  margin: 15px 0;
`

export const TotalText = styled.h3`
  text-align: right;
  margin-top: 20px;
  font-size: 20px;
  font-weight: 700;
`

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;
  margin-bottom: 15px;

  &:focus {
    outline: none;
    border-color: #2563eb;
  }
`

export const Row = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`

export const Button = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  padding: 14px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 15px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(37, 99, 235, 0.3);
  }
`

export const ErrorText = styled.p`
  color: red;
  margin-bottom: 10px;
`
export const TotalContainer = styled.div`
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
`
