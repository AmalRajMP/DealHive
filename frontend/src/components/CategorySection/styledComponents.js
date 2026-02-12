import styled from 'styled-components'

export const SectionContainer = styled.div`
  width: 100%;
  margin-top: 12px;
  padding: 0 14px;
`

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1e40af;
  margin: 7px 0px;
`

export const SectionSubtitle = styled.p`
  font-size: 13px;
  color: #475569;
  margin-bottom: 14px;
  line-height: 1.4;
`

export const ProductsList = styled.div`
  width: 100%;
  gap: 16px;

  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;

  @media screen and (min-width: 769px) {
    gap: 20px;
  }
`
