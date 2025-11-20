import { useState } from 'react'
import { FaRegUser } from 'react-icons/fa'
import { MdLockOutline } from 'react-icons/md'

import {
  FormContainer,
  Heading,
  Label,
  InputContainer,
  Icon,
  InputEle,
  Button,
} from './styledComponents'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onChangeUsername = (event) => setUsername(event.target.value)
  const onChangePassword = (event) => setPassword(event.target.value)

  const submitForm = (event) => {
    event.preventDefault()
  }

  return (
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
          id="username"
          type="text"
          value={username}
          placeholder="Enter your username"
          onChange={onChangeUsername}
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

      <Button type="submit">LOGIN</Button>
    </FormContainer>
  )
}

export default LoginForm
