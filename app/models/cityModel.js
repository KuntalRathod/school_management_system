import db from "../../config/db.js"

class CityModel {
  static async addCity(name, latitude, longitude) {
    try {
      const query =
        "INSERT INTO cities (name, latitude, longitude) VALUES (?, ?, ?)"
      const [result] = await db.query(query, [name, latitude, longitude])
      return result.insertId
    } catch (error) {
      throw error
    }
  }

  static async getCityByName(name) {
    try {
      console.log("Fetching city:", name) // Debugging log
      const query =
        "SELECT name, latitude, longitude FROM cities WHERE name = ?"
      const [result] = await db.query(query, [name])
      console.log("City found:", result) // Debugging log;

      return result.length ? result[0] : null
    } catch (error) {
      throw error
    }
  }
}

export default CityModel
