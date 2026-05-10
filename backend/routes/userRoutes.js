const express = require('express')
const router = express.Router()

const { getCurrentUserDetails } = require('../controllers/userController')
const authenticateUser = require('../middleware/authenticateUser')

router.get('/me', authenticateUser, getCurrentUserDetails)

module.exports = router
