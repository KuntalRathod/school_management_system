import UserModel from "../models/userModel.js"

class UserController {
  static async getAllUsers(req, res) {
    try {
      let { page, limit } = req.query

      page = parseInt(page) || 1
      limit = parseInt(limit) || 10 // Default limit to 10 users per page
      const offset = (page - 1) * limit

      const users = await UserModel.getAllUsers(limit, offset)
      const totalUsers = await UserModel.getUsersCount()
      const totalPages = Math.ceil(totalUsers / limit)

      res.status(200).json({
        page,
        limit,
        totalUsers,
        totalPages,
        users,
      })
    } catch (error) {
      console.error("Error getting users:", error)
      res.status(500).json({ error: error.message })
    }
  }
  static async getUserById(req, res) {
    try {
      // Extract the user id from the request parameters
      const { id } = req.params

      console.log("id", id)

      const userId = req.user.id

      console.log("userId", userId)

      //user can only view their own profile
      if (Number(userId) !== Number(id)) {
        // console.log("userId", typeof userId)
        // console.log("id", typeof id)

        return res.status(403).json({ error: "Unauthorized access" })
      }
      // Get the user from the database using the AuthModel
      const [rows] = await UserModel.getUserById(id)

      // Check if the user exists
      if (rows.length === 0) {
        return res.status(404).json({ error: "User not found" })
      }

      res.status(200).json(rows[0])
    } catch (error) {
      console.error("Error getting user:", error)
      res.status(500).json({ error: error.message })
    }
  }
  static async updateUserById(req, res) {
    try {
      // Extract the user id from the request parameters
      const { id } = req.params
      // Extract the user data from the request body
      const user = req.body
      // Update the user in the database using the AuthModel
      const result = await UserModel.updateUserById(id, user)
      res.status(200).json({ message: "User updated successfully" })
    } catch (error) {
      console.error("Error updating user:", error)
      res.status(500).json({ error: error.message })
    }
  }
  static async deleteUserById(req, res) {
    try {
      // Extract the user id from the request parameters
      const { id } = req.params
      // Delete the user from the database using the AuthModel
      const result = await UserModel.deleteUserById(id)
      res.status(200).json({ message: "User deleted successfully" })
    } catch (error) {
      console.error("Error deleting user:", error)
      res.status(500).json({ error: error.message })
    }
  }

  static async getUsersCountByAgeGroups(req, res) {
    try {
      const usersCount = await UserModel.getUsersCountByAgeGroups()

      res.status(200).json(usersCount)
    } catch (error) {
      console.error("Error fetching users count by age groups:", error)
      res.status(500).json({ error: error.message })
    }
  }
}
export default UserController
