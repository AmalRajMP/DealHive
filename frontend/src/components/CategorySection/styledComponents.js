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
  margin-bottom: 4px;
`

export const SectionSubtitle = styled.p`
  font-size: 13px;
  color: #475569;
  margin-bottom: 14px;
  line-height: 1.4;
`
export const ProductsList = styled.div`
  display: flex;
  gap: 12px;
  padding: 4px 2px 10px 2px;

  overflow-x: auto;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }
`
