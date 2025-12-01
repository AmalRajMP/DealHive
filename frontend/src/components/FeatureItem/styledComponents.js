import styled from 'styled-components'

export const FeatureCard = styled.div`
  height: 60px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  flex: 1 0 100%;
  gap: 20px;
  border-radius: 10px;
`

export const FeatureIcon = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1e88e5;
  font-size: 22px;
`
export const FeatureInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`
export const FeatureInfoTitle = styled.h2`
  color: #262626;
  font-size: 14px;
`
export const FeatureInfoSubTitle = styled.p`
  color: #525252;
  font-size: 12px;
`
