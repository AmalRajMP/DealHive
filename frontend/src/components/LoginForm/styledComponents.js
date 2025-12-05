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
  color: red;
  font-size: 13px;
  margin-top: 8px;
`
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
export const SignupPrompt = styled.p`
  text-align: center;
  margin-top: 10px;
  font-size: 12px;
  color: #555;

  @media screen and (min-width: 768px) {
    font-size: 13px;
  }
`

export const SignupLink = styled.a`
  color: #4a86e7;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`
