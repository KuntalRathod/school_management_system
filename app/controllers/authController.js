import AuthModel from "../models/authModel.js"
import jwt from "jsonwebtoken"

class AuthController {
  // Method to handle user registration
  static async createUser(req, res) {
    try {
      // Extract user data from the request body
      const user = req.body // expecting { name, email, username, password, usertype , profileImage} }

      console.log("User data:", user)

      // If a profile image was uploaded via multer, add the filename to user data
      if (req.file) {
        user.profileImage = req.file.filename
      }

      // Insert the user into the database using the AuthModel
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

  // New login method
  static async login(req, res) {
    try {
      // Extract email and/or username and password from the request body
      const { email, username, password } = req.body
      // Call the login functionality from the UserModel
      const userData = await AuthModel.login({ email, username, password })

      const token = jwt.sign(
        // include info such as email and user id
        { usertype: userData.usertype, id: userData.id },
        process.env.JWT_SECRET,
        { expiresIn: "12h" }
      )

      // Remove the password from the response
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
