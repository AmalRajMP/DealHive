const express = require('express')
const router = express.Router()
const { getRecommendations } = require('../controllers/recommendController')
const authenticateUser = require('../middleware/authenticateUser')

router.get('/', authenticateUser, getRecommendations)

module.exports = router
