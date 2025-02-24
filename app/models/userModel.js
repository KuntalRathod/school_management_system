import db from "../../config/db.js"

class UserModel {
  // Static method to find all users with pagination
  static async getAllUsers(limit, offset) {
    // Ensure limit and offset are numbers to avoid SQL injection
    limit = parseInt(limit, 10) || 10
    offset = parseInt(offset, 10) || 0

    const query = `SELECT id,name, username, email, usertype FROM users LIMIT ${limit} OFFSET ${offset}`

    try {
      const [dbQuery] = await db.execute(query)
      return dbQuery
    } catch (error) {
      console.error("Error getting users:", error)
      throw error
    }
  }

  static async getUsersCount() {
    const query = `SELECT COUNT(*) AS total FROM users`

    try {
      const [[result]] = await db.execute(query)
      return result.total
    } catch (error) {
      console.error("Error getting user count:", error)
      throw error
    }
  }

  // Static method to find a user by id
  static async getUserById(id) {
    const query = `SELECT * FROM users WHERE id = ?`
    try {
      const dbQuery = await db.execute(query, [id])
      return dbQuery
    } catch (error) {
      console.error("Error getting user:", error)
      throw error
    }
  }

  static async updateUserById(id, user) {
    const { name, username, email, usertype } = user
    const query = `UPDATE users SET name = ?, username = ?, email = ?, usertype = ? WHERE id = ?`
    try {
      const result = await db.execute(query, [
        name,
        username,
        email,
        usertype,
        id,
      ])
      return result
    } catch (error) {
      console.error("Error updating user:", error)
      throw error
    }
  }

  static async deleteUserById(id) {
    const query = `DELETE FROM users WHERE id = ?`
    try {
      const result = await db.execute(query, [id])
      return result
    } catch (error) {
      console.error("Error deleting user:", error)
      throw error
    }
  }

  static async getUsersCountByAgeGroups() {
    const queries = {
      below10:
        "SELECT COUNT(*) AS count FROM users WHERE usertype = 'student' AND age < 10",
      between10and14:
        "SELECT COUNT(*) AS count FROM users WHERE usertype = 'student' AND age BETWEEN 10 AND 14",
      greaterThan14:
        "SELECT COUNT(*) AS count FROM users WHERE usertype = 'student' AND age > 14",
    }

    try {
      const [[below10]] = await db.execute(queries.below10)
      const [[between10and14]] = await db.execute(queries.between10and14)
      const [[greaterThan14]] = await db.execute(queries.greaterThan14)

      return {
        below10: below10.count,
        between10and14: between10and14.count,
        greaterThan14: greaterThan14.count,
      }
    } catch (error) {
      console.error("Error fetching users count by age groups:", error)
      throw error
    }
  }
}

export default UserModel
