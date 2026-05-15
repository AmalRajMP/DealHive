const express = require('express')
const router = express.Router()

const {
  getCurrentUserDetails,
  updateUserDetails,
} = require('../controllers/userController')
const authenticateUser = require('../middleware/authenticateUser')

router.get('/me', authenticateUser, getCurrentUserDetails)
router.put('/me', authenticateUser, updateUserDetails)
module.exports = router
