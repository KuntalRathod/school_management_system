import db from "../../config/db.js"

class StudentClassModel {
  static async getAllStudentClasses() {
    const query = `
                   select sc.id , u.name as student_name , c.class_name , s.subject_name
                            from student_classes sc
                   inner join users u
                            on sc.student_id = u.id
                   inner join classes c
                            on sc.class_id = c.id
                   inner join subjects s
                            on sc.subject_id = s.id
                   where u.usertype = "student";
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
