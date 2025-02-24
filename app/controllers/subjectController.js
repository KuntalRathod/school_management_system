import SubjectModel from "../models/subjectModel.js"

class SubjectController {
  static async getAllSubjects(req, res) {
    try {
      const rows = await SubjectModel.getAllSubjects()
      res.status(200).json(rows)
    } catch (error) {
      console.error("Error getting subjects:", error)
      res.status(500).json({ error: error.message })
    }
  }

  static async createSubject(req, res) {
    try {
      const { subject_name } = req.body
      const result = await SubjectModel.createSubject(subject_name)
      res
        .status(201)
        .json({ message: "Subject created successfully", id: result.insertId })
    } catch (error) {
      console.error("Error creating subject:", error)
      res.status(500).json({ error: error.message })
    }
  }
}

export default SubjectController
