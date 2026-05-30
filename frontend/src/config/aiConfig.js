const AI_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://dealhive-ml.onrender.com"
    : "http://localhost:5001"

export default AI_BASE_URL
