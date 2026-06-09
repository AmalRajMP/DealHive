const express = require("express")
const cors = require("cors")
require("dotenv").config()
const connectDB = require("./config/db")
const cookieParser = require("cookie-parser")

const adminRoutes = require("./routes/adminRoutes")
const orderRoutes = require("./routes/orderRoutes")

const app = express()
app.use(express.json())
app.use(
  cors({
    origin: ["http://localhost:3000", "https://dealhive-1.onrender.com"],
    credentials: true,
  }),
)

app.use(cookieParser())

connectDB()

app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/products", require("./routes/productRoutes"))
app.use("/api/cart", require("./routes/cartRoutes"))
app.use("/api/wishlist", require("./routes/wishRoutes"))
app.use("/admin", adminRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/recommend", require("./routes/recommendRoutes"))
app.use("/api/chat", require("./routes/chatRoutes"))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
