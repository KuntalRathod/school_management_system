import { createConnection } from "mysql2/promise"
import dotenv from "dotenv"
dotenv.config()

const db = await createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

console.log("Connected to MySQL database")

export default db
