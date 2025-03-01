import db from "../../config/db.js"

class ExcelModel {
  static async insertData(data) {
    try {
      const query = "INSERT INTO excel_data (name, email, age) VALUES ?"

      const values = data.map((row) => [row.Name, row.Email, row.Age])

      await db.query(query, [values])

      return { message: "Data inserted successfully!" }
    } catch (error) {
      throw new Error(error.message)
    }
  }
  static async getAllData() {
    try {
      const [rows] = await db.execute("SELECT * FROM excel_data")
      return rows
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

export default ExcelModel
