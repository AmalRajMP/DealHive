import styled from "styled-components"

export const SectionContainer = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-top: 12px;
  padding: 0px 3px;

  @media screen and (min-width: 768px) {
    padding: 0px 15px;
  }
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
  box-sizing: border-box;

  box-sizing: border-box;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 15px;
  padding: 0 10px;

  @media screen and (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    padding: 0;
  }
`

export const ProductSkeleton = styled.div`
  width: 170px;
  min-height: 220px;
  background-color: red;
`
