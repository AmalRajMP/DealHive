import styled from "styled-components"

export const Card = styled.div`
  display: flex;
  gap: 10px;

  margin-top: 10px;
  padding: 10px;

  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
`

export const Thumbnail = styled.img`
  width: 70px;
  height: 70px;

  object-fit: cover;
  border-radius: 8px;

  flex-shrink: 0;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  overflow: hidden;
`

export const Title = styled.p`
  margin: 0;

  font-size: 14px;
  font-weight: 600;

  color: #1e293b;
`

export const Price = styled.p`
  margin: 6px 0 2px;

  font-size: 15px;
  font-weight: bold;

  color: #2563eb;
`

export const Rating = styled.p`
  margin: 0;

  font-size: 13px;
  color: #64748b;
`
