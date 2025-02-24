import db from "../../config/db.js"

class TeacherClassModel {
  static async getAllTeacherClasses() {
    //inner join to get teacher name, class name and subject name from teacher_classes table
    const query = `
      SELECT tc.id, u.name AS teacher_name, c.class_name, s.subject_name 
      FROM teacher_classes tc
      JOIN users u ON tc.teacher_id = u.id
      JOIN classes c ON tc.class_id = c.id
      JOIN subjects s ON tc.subject_id = s.id
      WHERE u.usertype='teacher';
    `
    try {
      const [rows] = await db.execute(query)
      return rows
    } catch (error) {
      console.error("Error getting teacher classes:", error)
      throw error
    }
  }

  static async createTeacherClass(teacher_id, class_id, subject_id) {
    const query =
      "INSERT INTO teacher_classes (teacher_id, class_id, subject_id) VALUES (?, ?, ?)"
    try {
      const [result] = await db.execute(query, [
        teacher_id,
        class_id,
        subject_id,
      ])
      return result
    } catch (error) {
      console.error("Error creating teacher class:", error)
      throw error
    }
  }
}

export default TeacherClassModel
