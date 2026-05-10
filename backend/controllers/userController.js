const User = require('../models/User')

const getCurrentUserDetails = async (req, res) => {
  try {
    const userDetails = await User.findById(req.user.id).select('-password')

    if (!userDetails) {
      return res.status(404).json({
        message: 'User not found',
      })
    }

    res.send(userDetails)
  } catch (e) {
    res.status(500).json({
      message: 'Failed to fetch user details',
    })
  }
}

module.exports = { getCurrentUserDetails }
