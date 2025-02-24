import db from "../../config/db.js"

class StudentClassModel {
  static async getAllStudentClasses() {
    const query = `
      SELECT sc.id, u.name AS student_name, c.class_name, s.subject_name 
      FROM student_classes sc
      JOIN users u ON sc.student_id = u.id
      JOIN classes c ON sc.class_id = c.id
      JOIN subjects s ON sc.subject_id = s.id
      WHERE u.usertype='student';
    `
    try {
      const [rows] = await db.execute(query)
      return rows
    } catch (error) {
      console.error("Error getting student classes:", error)
      throw error
    }
  }

  static async createStudentClass(student_id, class_id, subject_id) {
    const query =
      "INSERT INTO student_classes (student_id, class_id, subject_id) VALUES (?, ?, ?)"
    try {
      const [result] = await db.execute(query, [
        student_id,
        class_id,
        subject_id,
      ])
      return result
    } catch (error) {
      console.error("Error creating student class:", error)
      throw error
    }
  }
}

export default StudentClassModel
