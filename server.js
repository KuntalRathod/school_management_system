import express from "express"
import "./config/db.js"
import initializeRouter from "./routes/index.js"
import { limiter } from "./utils/limiter.js"

const app = express()

app.use(limiter)


app.use(express.json())
app.use(express.urlencoded({ extended: true }))



initializeRouter(app)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log("Server is running on port", PORT)
})
