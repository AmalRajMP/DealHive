import styled from 'styled-components'

export const FormContainer = styled.form`
  min-height: auto;
  width: 100%;
  max-width: 380px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-radius: 15px;
  padding: 24px;
`
export const Heading = styled.h1`
  color: #1976d2;
  font-size: 24px;
  text-align: center;
`
export const Label = styled.label`
  color: #666666;
  font-size: 13px;
`
export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 2px solid #929090;
  padding: 10px;
`
export const Icon = styled.div`
  font-size: 16px;
  color: 616161;
`

export const InputEle = styled.input`
  width: 100%;
  background-color: transparent;
  color: #424242;
  font-size: 13px;
  border-width: 0px;
  padding: 6px 8px 6px 8px;

  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #ffffff inset !important;
    box-shadow: 0 0 0px 1000px #ffffff inset !important;
    -webkit-text-fill-color: #000 !important;
  }
`
export const ErrorMsg = styled.p`
  color: #d32f2f;
  font-size: 12px;
  margin-top: -8px;
  margin-bottom: 8px;
}`

export const Button = styled.button`
  width: 100%;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;

  background: linear-gradient(135deg, #64b5f6, #42a5f5);

  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.97);
  }
`

export const SuccessViewContainer = styled.div`
  min-height: auto;
  width: 100%;
  max-width: 380px;  
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  padding: 40px 20px;
  animation: fadeIn 0.4s ease-in-out;
`

export const SuccessCard = styled.div`
  margin-bottom: 20px;
`

export const TickCircle = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: #50e054ff;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: popIn 0.4s ease-in-out;
`

export const SuccessMsg = styled.h2`
  color: #36993aff;
  margin: 10px 0 5px;
  font-size: 22px;
  text-align: center;
`

export const SuccessSubMsg = styled.p`
  color: #555;
  font-size: 12px;
  margin-bottom: 25px;
  text-align: center;
`

export const GoToLoginBtn = styled.button`
  background: linear-gradient(135deg, #64b5f6, #42a5f5);
  border: none;
  color: #fff;
  padding: 12px 25px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;

  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.97);
  }
`
