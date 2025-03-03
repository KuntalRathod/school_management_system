import AuthModel from "../models/authModel.js"
import jwt from "jsonwebtoken"

class AuthController {
  static async createUser(req, res) {
    try {
      const user = req.body
      console.log("User data:", user)

      if (req.file) {
        user.profileImage = req.file.filename
      }

      const result = await AuthModel.insertUser(user)

      res.status(201).json({
        message: "User created successfully",
        user: {
          id: result[0].insertId,
          ...user,
        },
      })
    } catch (error) {
      console.error("Error creating user:", error)
      res.status(400).json({ error: error.message })
    }
  }

  static async login(req, res) {
    try {
      const { email, username, password } = req.body
      const userData = await AuthModel.login({ email, username, password })

      const token = jwt.sign(
        { usertype: userData.usertype, id: userData.id },
        process.env.JWT_SECRET,
        { expiresIn: "12h" }
      )

      delete userData.password
      res
        .status(200)
        .json({ message: "Login successful", token, user: userData })
    } catch (error) {
      console.error("Error logging in:", error)
      res.status(400).json({ error: error.message })
    }
  }
}
export default AuthController
