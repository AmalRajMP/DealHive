const express = require('express')
const router = express.Router()

const {
  getWishList,
  addToWishList,
  removeFromWishList,
} = require('../controllers/wishController')

router.get('/user/:userId', getWishList)

router.post('/add', addToWishList)

router.post('/remove', removeFromWishList)

module.exports = router
