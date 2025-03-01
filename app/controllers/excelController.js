import xlsx from 'xlsx'
import ExcelModel from '../models/excelModel.js'

class ExcelController {
  static async uploadFile(req, res) {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" })
      }

      // Read Excel File
      const workbook = xlsx.readFile(req.file.path)
      const sheetName = workbook.SheetNames[0]
      const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName])

      // Insert into Database
      const response = await ExcelModel.insertData(data)

      res.json(response)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}
export default ExcelController
