import styled from 'styled-components'

export const FeatureCard = styled.div`
  min-height: 64px;
  height: auto;
  padding: 10px 14px;

  background-color: #ffffff;

  display: flex;
  align-items: center;
  flex: 1 0 100%;
  gap: 20px;
  border-radius: 10px;
  border: 1px solid rgba(30, 136, 229, 0.08);

  transition: transform 0.3s, box-shadow 0.3s;

  @media screen and (min-width: 768px) {
    height: 180px;
    width: 400px;
    flex-direction: column;
    justify-content: center;
    gap: 30px;
    padding: 20px;

    &:hover {
      transform: translateY(-6px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
    }
  }
`

export const FeatureIcon = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1e88e5;
  font-size: 22px;

  @media screen and (min-width: 768px) {
    display: none;
    opacity: 0.95;
  }
`
export const FeatureImage = styled.img`
  height: 130px;
  width: 130px;
  position: relative;
  margin-top: -35px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`

export const FeatureInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media screen and (min-width: 768px) {
    align-items: center;
    margin-top: -40px;
  }
`
export const FeatureInfoTitle = styled.h2`
  color: #262626;
  font-size: 14px;
  font-weight: 600;

  @media screen and (min-width: 768px) {
    font-size: 20px;
  }
`
export const FeatureInfoSubTitle = styled.p`
  color: #525252;
  font-size: 12px;
  line-height: 1.4;

  @media screen and (min-width: 768px) {
    font-size: 16px;
  }
`
