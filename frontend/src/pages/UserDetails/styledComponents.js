import styled from 'styled-components'

export const UserDetailsPage = styled.div`
  min-height: 100vh;
  background: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;

  /* navbar-safe padding */
  padding: 80px 15px 15px 15px;

  @media screen and (max-width: 768px) {
    padding: 80px 8px;
    align-items: flex-start;
  }
`

export const ProfileCard = styled.div`
  width: 100%;
  max-width: 850px;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0px 8px 24px rgba(15, 23, 42, 0.08);

  @media screen and (max-width: 768px) {
    padding: 24px;
    border-radius: 16px;
  }

  @media screen and (max-width: 480px) {
    padding: 18px;
  }
`

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 35px;
  padding-bottom: 25px;
  border-bottom: 1px solid #e2e8f0;

  @media screen and (max-width: 576px) {
    flex-direction: column;
    text-align: center;
    gap: 14px;
  }
`

export const EditButton = styled.button`
  background-color: #ffffff;
  color: #2563eb;
  border: 1px solid #2563eb;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  padding: 10px 18px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  transition: all 0.2s ease;

  &:hover {
    background-color: #eff6ff;
  }
`
export const ActionButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;

  @media screen and (max-width: 768px) {
    margin-left: 0;
    margin-top: 16px;
    width: 100%;
    justify-content: flex-start;
  }
`
export const CancelButton = styled.button`
  background-color: transparent;
  color: #475569;
  border: 1px solid #cbd5e1;
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background-color: #f8fafc;
  }
`

export const SaveButton = styled.button`
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s ease;

  &:hover {
    background-color: #1d4ed8;
  }
`

export const InputBox = styled.input`
  width: ${(props) => (props.isHeaderInput ? '320px' : '100%')};
  padding: 10px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 14px;
  font-family: 'Roboto';
  color: #1e293b;
  background-color: #ffffff;
  outline: none;
  transition: all 0.2s ease;

  &:focus {
    border-color: #2563eb;
    box-shadow: 0px 0px 4px rgba(37, 99, 235, 0.3);
  }
`

export const ProfileAvatar = styled.div`
  width: 85px;
  height: 85px;
  border-radius: 50%;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: white;
  font-size: 32px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  @media screen and (max-width: 576px) {
    width: 70px;
    height: 70px;
    font-size: 26px;
  }
`

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export const ProfileName = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #0f172a;
  margin: 0;

  @media screen and (max-width: 576px) {
    font-size: 22px;
  }
`

export const ProfileEmail = styled.p`
  font-size: 15px;
  color: #64748b;
  margin-top: 6px;
  margin-bottom: 0;

  @media screen and (max-width: 576px) {
    font-size: 14px;
  }
`

export const SectionHeading = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 18px;
  margin-top: 25px;

  @media screen and (max-width: 576px) {
    font-size: 18px;
  }
`

export const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  margin-bottom: 25px;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const DetailBox = styled.div`
  background-color: #f1f5f9;
  padding: 18px;
  border-radius: 14px;
  min-height: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 576px) {
    padding: 14px;
    min-height: auto;
  }
`

export const Key = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  margin: 0 0 8px 0;
`

export const Value = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
  margin: 0;
  word-break: break-word;

  @media screen and (max-width: 576px) {
    font-size: 15px;
  }
`

export const LoaderContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
