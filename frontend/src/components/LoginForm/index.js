import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { MdLockOutline, MdEmail } from 'react-icons/md'
import apiStatusConstants from '../../constants/apiStatusConstants'

import {
  FormContainer,
  Heading,
  Label,
  InputContainer,
  Icon,
  InputEle,
  ErrorMsg,
  Button,
  SignupPrompt,
  SignupLink,
} from './styledComponents'
import { ThreeDots } from 'react-loader-spinner'

const LoginForm = () => {
  const [emailID, setEmailID] = useState('')
  const [password, setPassword] = useState('')
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [errorMsg, setErrorMsg] = useState('')

  const navigate = useNavigate()

  const token = localStorage.getItem('authToken')
  if (token) return <Navigate to="/home" />

  const onChangeEmailID = (event) => {
    setErrorMsg('')
    setEmailID(event.target.value)
  }
  const onChangePassword = (event) => {
    setErrorMsg('')
    setPassword(event.target.value)
  }

  const submitForm = async (event) => {
    event.preventDefault()
    setApiStatus(apiStatusConstants.inProgress)

    const url = 'http://localhost:5000/api/auth/login'
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailID,
        password,
      }),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      setApiStatus(apiStatusConstants.success)
      localStorage.setItem('authToken', data.token)
      localStorage.setItem('dealhive_username', data.firstName)
      localStorage.setItem('userId', data.user._id)
      console.log(data.token)
      navigate('/home')
    } else {
      setApiStatus(apiStatusConstants.failure)
      setErrorMsg(data.message)
    }
  }

  return (
    <>
      {apiStatus !== apiStatusConstants.inProgress && (
        <FormContainer onSubmit={submitForm}>
          <input
            type="text"
            name="fake_username"
            autoComplete="off"
            style={{ display: 'none' }}
          />

          <input
            type="password"
            name="fake_password"
            autoComplete="new-password"
            style={{ display: 'none' }}
          />

          <Heading>Login</Heading>
          <Label htmlFor="emailID">Email ID</Label>
          <InputContainer>
            <Icon>
              <MdEmail />
            </Icon>
            <InputEle
              id="emailID"
              type="email"
              value={emailID}
              placeholder="Enter your email"
              onChange={onChangeEmailID}
              autoComplete="off"
            />
            {emailID && !emailID.includes('@') && (
              <ErrorMsg>Please enter a valid email</ErrorMsg>
            )}
          </InputContainer>

          <Label htmlFor="password">Password</Label>
          <InputContainer>
            <Icon>
              <MdLockOutline />
            </Icon>
            <InputEle
              id="password"
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChangePassword}
              autoComplete="off"
            />
          </InputContainer>
          {apiStatus === apiStatusConstants.failure && (
            <ErrorMsg>{errorMsg}</ErrorMsg>
          )}
          <Button type="submit">LOGIN</Button>
          <SignupPrompt>
            Don’t have an account?{' '}
            <SignupLink href="/register">Sign up</SignupLink>
          </SignupPrompt>
        </FormContainer>
      )}

      {apiStatus === apiStatusConstants.inProgress && (
        <ThreeDots height="50" width="50" color="#ffffff" />
      )}
    </>
  )
}

export default LoginForm
