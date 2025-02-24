import db from "../../config/db.js"

class ClassModel {
  static async getAllClasses() {
    const query = "SELECT * FROM classes"
    try {
      const [rows] = await db.execute(query)
      return rows
    } catch (error) {
      console.error("Error getting classes:", error)
      throw error
    }
  }

  static async createClass(class_name) {
    const query = "INSERT INTO classes (class_name) VALUES (?)"
    try {
      const [result] = await db.execute(query, [class_name])
      return result
    } catch (error) {
      console.error("Error creating class:", error)
      throw error
    }
  }
}

export default ClassModel
