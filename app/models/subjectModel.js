import db from "../../config/db.js"

class SubjectModel {
  static async getAllSubjects() {
    const query = "SELECT * FROM subjects"
    try {
      const [rows] = await db.execute(query)
      return rows
    } catch (error) {
      console.error("Error getting subjects:", error)
      throw error
    }
  }

  static async createSubject(subject_name) {
    const query = "INSERT INTO subjects (subject_name) VALUES (?)"
    try {
      const [result] = await db.execute(query, [subject_name])
      console.log(result);
      
      return result
    } catch (error) {
      console.error("Error creating subject:", error)
      throw error
    }
  }
}

export default SubjectModel
