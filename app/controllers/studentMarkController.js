import StudentMarkModel from "../../app/models/studentMarkModel.js"

class StudentMarkController {
  // Get all student marks
  static async getAll(req, res) {
    try {
      const marks = await StudentMarkModel.getAll()
      res.json(marks)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  // Add new student mark
  static async addStudent(req, res) {
    try {
      const {
        student_id,
        subject_id,
        teacher_id,
        marks_obtained,
        total_marks,
      } = req.body

      if (
        !student_id ||
        !subject_id ||
        !teacher_id ||
        marks_obtained == null ||
        total_marks == null
      ) {
        return res.status(400).json({ message: "All fields are required" })
      }

      const insertId = await StudentMarkModel.add_student(
        student_id,
        subject_id,
        teacher_id,
        marks_obtained,
        total_marks
      )

      res
        .status(201)
        .json({ message: "Marks added successfully", id: insertId })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  // Get student marks by student id
  static async getStudentMarks(req, res) {
    try {
      const { id } = req.params
      console.log(id)

      // const userId = req.user.id

      // if (Number(userId) !== Number(student_id)) {
      //   return res.status(403).json({ error: "Unauthorized access" })
      // }

      const marks = await StudentMarkModel.getStudentsMarks(id)
      console.log("marks", marks)

      res.status(200).json(marks)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

}

export default StudentMarkController
