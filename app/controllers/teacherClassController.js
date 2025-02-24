import TeacherClassModel from "../models/teacherClassModel.js"

class TeacherClassController {
  static async getAllTeacherClasses(req, res) {
    try {
      const rows = await TeacherClassModel.getAllTeacherClasses()
      res.status(200).json(rows)
    } catch (error) {
      console.error("Error getting teacher classes:", error)
      res.status(500).json({ error: error.message })
    }
  }

  static async createTeacherClass(req, res) {
    try {
      const { teacher_id, class_id, subject_id } = req.body
      const result = await TeacherClassModel.createTeacherClass(
        teacher_id,
        class_id,
        subject_id
      )
      res.status(201).json({
        message: "Teacher class created successfully",
        id: result.insertId,
      })
    } catch (error) {
      console.error("Error creating teacher class:", error)
      res.status(500).json({ error: error.message })
    }
  }
}

export default TeacherClassController
