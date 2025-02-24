import StudentClassModel from "../models/studentClassModel.js"

class StudentClassController {
  static async getAllStudentClasses(req, res) {
    try {
      const rows = await StudentClassModel.getAllStudentClasses()
      res.status(200).json(rows)
    } catch (error) {
      console.error("Error getting student classes:", error)
      res.status(500).json({ error: error.message })
    }
  }

  static async createStudentClass(req, res) {
    try {
      const { student_id, class_id, subject_id } = req.body
      const result = await StudentClassModel.createStudentClass(
        student_id,
        class_id,
        subject_id
      )
      res.status(201).json({
        message: "Student class created successfully",
        id: result.insertId,
      })
    } catch (error) {
      console.error("Error creating student class:", error)
      res.status(500).json({ error: error.message })
    }
  }
}

export default StudentClassController
