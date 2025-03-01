import db from "../../config/db.js"

class ExcelModel {
  static async insertData(data) {
    try {
      const query = "INSERT INTO excel_data (name, email, age) VALUES (?, ?, ?)"
      for (let row of data) {
        await db.execute(query, [row.Name, row.Email, row.Age])
      }
      return { message: "Data inserted successfully!" }
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export default ExcelModel
