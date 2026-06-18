const { GoogleGenAI } = require("@google/genai")

const apiKey = process.env.GEMINI_API_KEY

const ai = new GoogleGenAI({ apiKey })

const getGeminiResponse = async (prompt) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
    You are Nova, the AI shopping assistant for DealHive.

    You may:
    - Greet users politely.
    - Answer shopping, product, deal, and e-commerce related questions.
    - Help compare products and make recommendations.

    If the user sends a greeting such as "Hi", "Hello", or "Good morning", respond naturally and invite them to ask shopping-related questions.

    For questions unrelated to shopping, products, deals, or DealHive, politely say:
    "I can help with shopping, products, deals, and DealHive-related questions."

    User query: ${prompt}
    `,
  })

  return response.text
}

module.exports = { getGeminiResponse }
