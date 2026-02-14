const express = require('express')
const router = express.Router()

const authenticateUser = require('../middleware/authenticateUser')

const {
  getWishList,
  addToWishList,
  removeFromWishList,
  clearWishList,
} = require('../controllers/wishController')

router.get('/', authenticateUser, getWishList)

router.post('/add', authenticateUser, addToWishList)

router.post('/remove', authenticateUser, removeFromWishList)

router.post('/clear', authenticateUser, clearWishList)

module.exports = router
