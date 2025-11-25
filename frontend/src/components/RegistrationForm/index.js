import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaRegUser, FaPhoneAlt } from 'react-icons/fa'
import { MdEmail, MdLockOutline, MdDone } from 'react-icons/md'
import apiStatusConstants from '../../constants/apiStatusConstants'
import { ThreeDots } from 'react-loader-spinner'

import {
  FormContainer,
  Heading,
  Label,
  InputContainer,
  Icon,
  InputEle,
  ErrorMsg,
  Button,
  SuccessViewContainer,
  SuccessCard,
  TickCircle,
  SuccessMsg,
  SuccessSubMsg,
  GoToLoginBtn,
} from './styledComponents'

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailID, setEmailID] = useState('')
  const [contactNo, setContactNo] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const navigate = useNavigate()

  const onChangeFirstName = (event) => setFirstName(event.target.value)
  const onChangeLastName = (event) => setLastName(event.target.value)
  const onChangeEmailID = (event) => setEmailID(event.target.value)
  const onChangeContactNo = (event) => setContactNo(event.target.value)
  const onChangePassword = (event) => setPassword(event.target.value)
  const onChangeConfirmPassword = (event) =>
    setConfirmPassword(event.target.value)

  const submitForm = async (event) => {
    event.preventDefault()

    setApiStatus(apiStatusConstants.inProgress)

    const url = 'http://localhost:5000/api/auth/register'
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastName,
        emailID,
        contactNo,
        password,
      }),
    }

    const response = await fetch(url, options)
    if (response.ok) {
      setApiStatus(apiStatusConstants.success)
      console.log('User registered successfully')
    } else {
      setApiStatus(apiStatusConstants.failure)
      const data = await response.json()
      console.log(data.message)
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

          <Heading>Register</Heading>
          <Label htmlFor="firstName">First Name</Label>
          <InputContainer>
            <Icon>
              <FaRegUser />
            </Icon>
            <InputEle
              id="firstName"
              type="text"
              value={firstName}
              placeholder="Enter first name"
              onChange={onChangeFirstName}
              required
              autoComplete="off"
            />
          </InputContainer>

          <Label htmlFor="lastName">Last Name</Label>
          <InputContainer>
            <Icon>
              <FaRegUser />
            </Icon>
            <InputEle
              id="lastName"
              type="text"
              value={lastName}
              placeholder="Enter last name"
              onChange={onChangeLastName}
              required
              autoComplete="off"
            />
          </InputContainer>

          <Label htmlFor="emailID">Email Address</Label>
          <InputContainer>
            <Icon>
              <MdEmail />
            </Icon>
            <InputEle
              id="emailID"
              type="email"
              value={emailID}
              placeholder="Enter email"
              onChange={onChangeEmailID}
              required
              autoComplete="off"
            />
          </InputContainer>
          {emailID && !emailID.includes('@') && (
            <ErrorMsg>Please enter a valid email</ErrorMsg>
          )}

          <Label htmlFor="contactNo">Contact No</Label>
          <InputContainer>
            <Icon>
              <FaPhoneAlt />
            </Icon>
            <InputEle
              id="contactNo"
              type="tel"
              value={contactNo}
              placeholder="Enter contact no"
              onChange={onChangeContactNo}
              required
              autoComplete="off"
            />
          </InputContainer>
          {contactNo && contactNo.length !== 10 && (
            <ErrorMsg>Phone number must be 10 digits</ErrorMsg>
          )}

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
              required
              autoComplete="off"
            />
          </InputContainer>
          {password && password.length < 6 && (
            <ErrorMsg>Password must be at least 6 characters</ErrorMsg>
          )}

          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <InputContainer>
            <Icon>
              <MdLockOutline />
            </Icon>
            <InputEle
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={onChangeConfirmPassword}
              required
              autoComplete="off"
            />
          </InputContainer>

          {password !== confirmPassword && (
            <ErrorMsg>Passwords do not match</ErrorMsg>
          )}

          <Button
            type="submit"
            disabled={
              !firstName ||
              !lastName ||
              !emailID ||
              !contactNo ||
              !password ||
              !confirmPassword
            }
          >
            Register
          </Button>
        </FormContainer>
      )}

      {apiStatus === apiStatusConstants.inProgress && (
        <ThreeDots height="50" width="50" color="#ffffffff" />
      )}

      {apiStatus === apiStatusConstants.success && (
        <SuccessViewContainer>
          <SuccessCard>
            <TickCircle>
              <MdDone size={45} color="#fff" />
            </TickCircle>
          </SuccessCard>

          <SuccessMsg>Registration Successful</SuccessMsg>
          <SuccessSubMsg>You can now log in to your account.</SuccessSubMsg>

          <GoToLoginBtn onClick={() => navigate('/login')}>
            Go to Login
          </GoToLoginBtn>
        </SuccessViewContainer>
      )}
    </>
  )
}

export default RegistrationForm
