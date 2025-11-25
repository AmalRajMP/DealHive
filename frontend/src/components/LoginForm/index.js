import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaRegUser } from 'react-icons/fa'
import { MdLockOutline } from 'react-icons/md'
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
} from './styledComponents'
import { ThreeDots } from 'react-loader-spinner'

const LoginForm = () => {
  const [emailID, setEmailID] = useState('')
  const [password, setPassword] = useState('')
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const [errorMsg, setErrorMsg] = useState('')

  const onChangeEmailID = (event) => setEmailID(event.target.value)
  const onChangePassword = (event) => setPassword(event.target.value)

  const navigate = useNavigate()

  useEffect(() => {
    if (apiStatus === apiStatusConstants.success) {
      navigate('/')
    }
  }, [apiStatus, navigate])

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
      console.log(data.message)
    } else {
      setApiStatus(apiStatusConstants.failure)
      setErrorMsg(data.message)
    }
  }

  return (
    <>
      {apiStatus === apiStatusConstants.initial && (
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
          <Label htmlFor="username">Username</Label>
          <InputContainer>
            <Icon>
              <FaRegUser />
            </Icon>
            <InputEle
              id="emailID"
              type="email"
              value={emailID}
              placeholder="Enter your email"
              onChange={onChangeEmailID}
              autoComplete="off"
            />
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
        </FormContainer>
      )}

      {apiStatus === apiStatusConstants.inProgress && (
        <ThreeDots height="50" width="50" color="#ffffff" />
      )}
    </>
  )
}

export default LoginForm
