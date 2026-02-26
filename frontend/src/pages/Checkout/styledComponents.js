import styled from 'styled-components'

export const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
  padding: 20px;
`

export const FormCard = styled.form`
  background-color: #ffffff;
  padding: 30px;
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 15px;
`

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 10px;
`

export const Input = styled.input`
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`

export const Row = styled.div`
  display: flex;
  gap: 10px;
`

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 12px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s ease;

  &:hover {
    background-color: #0056b3;
  }
`

export const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
`
