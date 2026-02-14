const express = require('express')
const router = express.Router()

const {
  getCart,
  addToCart,
  addMultipleToCart,
  removeFromCart,
  updateQuantity,
} = require('../controllers/cartController')

router.get('/user/:userId', getCart)

router.post('/add', addToCart)

router.post('/add-multiple', addMultipleToCart)

router.post('/remove', removeFromCart)

router.post('/update-quantity', updateQuantity)

module.exports = router
