import ClassModel from "../models/classModel.js"

class ClassController {
  static async getAllClasses(req, res) {
    try {
      const rows = await ClassModel.getAllClasses()
      res.status(200).json(rows)
    } catch (error) {
      console.error("Error getting classes:", error)
      res.status(500).json({ error: error.message })
    }
  }

  static async createClass(req, res) {
    try {
      const { class_name } = req.body
      const result = await ClassModel.createClass(class_name)
      res
        .status(201)
        .json({ message: "Class created successfully", id: result.insertId })
    } catch (error) {
      console.error("Error creating class:", error)
      res.status(500).json({ error: error.message })
    }
  }
}

export default ClassController
