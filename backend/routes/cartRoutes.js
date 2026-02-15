const express = require('express')
const router = express.Router()
const authenticateUser = require('../middleware/authenticateUser')

router.use(authenticateUser)

const {
  getCart,
  addToCart,
  addMultipleToCart,
  removeFromCart,
  updateQuantity,
} = require('../controllers/cartController')

router.get('/', getCart)

router.post('/add', addToCart)

router.post('/add-multiple', addMultipleToCart)

router.post('/remove', removeFromCart)

router.post('/update-quantity', updateQuantity)

module.exports = router
