const { getGeminiResponse } = require("../services/geminiService")
const { extractFilters } = require("../utils/extractFilters")

const sendResponse = async (req, res) => {
  try {
    const userQuery = req.body.query
    const filters = extractFilters(userQuery)
    console.log(filters)

    const modelResponse = await getGeminiResponse(userQuery)

    return res.status(200).json({
      text: modelResponse,
      sender: "bot",
    })
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      text: "Sorry, I'm having trouble responding right now.",
      sender: "bot",
    })
  }
}

module.exports = { sendResponse }
