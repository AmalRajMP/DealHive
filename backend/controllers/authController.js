const jwt = require('jsonwebtoken')
const User = require('../models/User')

const logActivity = require('../utils/logActivity')

const bcrypt = require('bcryptjs')

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, emailID, contactNo, password } = req.body

    const existingUser = await User.findOne({ emailID })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      firstName,
      lastName,
      emailID,
      contactNo,
      password: hashedPassword,
    })

    await logActivity(newUser._id, 'Registered')

    res.status(201).json({ message: 'User registered successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

const loginUser = async (req, res) => {
  try {
    const { emailID, password } = req.body

    const user = await User.findOne({ emailID })
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    const isSame = await bcrypt.compare(password, user.password)
    if (!isSame) {
      return res.status(400).json({ message: 'Invalid email or password' })
    }

    await logActivity(user._id, 'Login')

    const accessToken = jwt.sign(
      { id: user._id, emailID: user.emailID, role: user.role },
      process.env.JWT_SECRET || 'default_secret_key',
      { expiresIn: '1h' },
    )

    const refreshToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.REFRESH_SECRET || 'refresh_secret',
      { expiresIn: '7d' },
    )

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    })

    return res.status(200).json({
      message: 'Login successful',
      token: accessToken,
      userId: user._id,
      firstName: user.firstName,
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

const refreshAccessToken = async (req, res) => {
  const token = req.cookies.refreshToken
  if (!token) return res.status(401).json({ error: 'Refresh token missing' })

  const secret = process.env.REFRESH_SECRET || 'refresh_secret'

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.sendStatus(403)
    }

    const newAccessToken = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'default_secret_key',
      { expiresIn: '1h' },
    )

    res.json({ token: newAccessToken })
  })
}

const logoutUser = (req, res) => {
  res.clearCookie('refreshToken')
  res.json({ message: 'Logged out successfully' })
}

module.exports = { registerUser, loginUser, refreshAccessToken, logoutUser }
