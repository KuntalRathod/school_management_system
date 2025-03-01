import xlsx from "xlsx"
import ExcelModel from "../models/excelModel.js"
import path from "path"
import ExcelJS from 'exceljs'

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

  static async exportToExcel(req, res) {
    try {
      // Fetch data from database
      const data = await ExcelModel.getAllData()

      if (data.length === 0) {
        return res.status(404).json({ message: "No data available to export" })
      }

      // Create a new Excel workbook and worksheet
      const workbook = new ExcelJS.Workbook()
      const worksheet = workbook.addWorksheet("Users Data")

      // Define the header row
      worksheet.columns = [
        { header: "ID", key: "id", width: 10 },
        { header: "Name", key: "name", width: 25 },
        { header: "Email", key: "email", width: 30 },
        { header: "Age", key: "age", width: 10 },
      ]

      // Add data to worksheet
      worksheet.addRows(data)

      // Set file path and name
      const filePath = path.join("uploads", "exported_data.xlsx")

      // Save the workbook to the file system
      await workbook.xlsx.writeFile(filePath)

      // Send the file as a response
      res.download(filePath, "users_data.xlsx")
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}
export default ExcelController
