const express = require('express')
const router = express.Router()

const authenticateUser = require('../middleware/authenticateUser')
const { checkoutCart, getMyOrders } = require('../controllers/orderController')

router.post('/checkout', authenticateUser, checkoutCart)
router.get('/my', authenticateUser, getMyOrders)

module.exports = router
