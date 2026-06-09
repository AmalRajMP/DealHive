const express = require("express")
const router = express.Router()

const { sendResponse } = require("../controllers/chatController")

router.post("/", sendResponse)

module.exports = router
