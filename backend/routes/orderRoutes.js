const express = require('express')
const router = express.Router()

const authenticateUser = require('../middleware/authenticateUser')
const { checkoutCart } = require('../controllers/orderController')

router.post('/checkout', authenticateUser, checkoutCart)

module.exports = router
