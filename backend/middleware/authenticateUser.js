const jwt = require('jsonwebtoken')

const authenticateUser = async (req, res, next) => {
  console.log(req.headers)
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'default_secret_key',
    )
    req.user = decoded
    next()
  } catch (e) {
    res.status(401).json({ message: 'Invalid token' })
  }
}

module.exports = authenticateUser
