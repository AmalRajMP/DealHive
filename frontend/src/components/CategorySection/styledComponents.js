import styled from 'styled-components'

export const SectionContainer = styled.div`
  width: 100%;
  margin-top: 12px;
`

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1e40af;
  margin: 10px;
`

export const SectionSubtitle = styled.p`
  font-size: 13px;
  color: #475569;
  margin: 10px;
  line-height: 1.4;
`

export const ProductsList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;

  @media screen and (max-width: 768px) {
    margin-left: 10px;
  }

  @media screen and (min-width: 769px) {
    gap: 20px;
  }
`
