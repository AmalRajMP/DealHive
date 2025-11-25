const User = require('../models/User')

const bcrypt = require('bcryptjs')

const registerUser = async (req, res) => {
  const { firstName, lastName, emailID, contactNo, password } = req.body

  const existingUser = await User.findOne({ emailID })
  if (existingUser) {
    return res.status(400).json({ message: 'Email already exists' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await User.create({
    firstName,
    lastName,
    emailID,
    contactNo,
    password: hashedPassword,
  })

  res.status(201).json({ message: 'User registered successfully' })
}

const loginUser = async (req, res) => {
  const { emailID, password } = req.body

  const user = await User.findOne({ emailID })

  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' })
  }

  const isSame = await bcrypt.compare(password, user.password)

  if (!isSame) {
    return res.status(400).json({ message: 'Invalid email or password' })
  }

  return res.status(200).json({ message: 'Login successful' })
}

module.exports = { registerUser, loginUser }
