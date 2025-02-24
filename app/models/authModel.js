import bcrypt from "bcrypt"
import db from "../../config/db.js"

async function registerUser(user) {
  const { name, username, email, password, age, usertype, profileImage } = user
  const query = `INSERT INTO users (name, username, email, password, age ,usertype, profileImage) VALUES (?, ?, ?, ?, ?,?,?)`

  try {
    // Hash the password before storing it in the database
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Execute the SQL query with the user data (use hashedPassword)
    const result = await db.execute(query, [
      name,
      username,
      email,
      hashedPassword,
      age,
      usertype,
      profileImage || null,
    ])
    return result // Return the result of the insert operation
  } catch (error) {
    console.error("Error inserting user:", error)
    throw error // Rethrow the error for further handling
  }
}

class AuthModel {
  // Static method to insert a new user into the database
  static async insertUser(user) {
    const { email, password } = user
    const checkQuery = `SELECT id FROM users WHERE email = ? LIMIT 1`
    const [rows] = await db.execute(checkQuery, [email], [password])
    if (rows.length > 0) {
      throw new Error("Email already exists")
    }
    return await registerUser(user)
  }

  // Add login functionality in UserModel
  static async login({ email, username, password }) {
    // Check that either email or username, and password are provided
    if ((!email && !username) || !password) {
      throw new Error("Username (or email) and password are mandatory")
    }

    // Determine which identifier to use for login
    let query, identifier
    if (email) {
      query = `SELECT * FROM users WHERE email = ? LIMIT 1`
      identifier = email
    } else {
      query = `SELECT * FROM users WHERE username = ? LIMIT 1`
      identifier = username
    }

    try {
      const [rows] = await db.execute(query, [identifier])
      if (rows.length === 0) {
        throw new Error("User not found")
      }
      const userData = rows[0]
      const isMatch = await bcrypt.compare(password, userData.password)
      if (!isMatch) {
        throw new Error("Invalid credentials")
      }
      return userData
    } catch (error) {
      console.error("Error during login:", error)
      throw error
    }
  }
}

export default AuthModel
