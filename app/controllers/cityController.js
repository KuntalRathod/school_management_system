import CityModel from "../models/cityModel.js"

class CityController {
  static async addCities(req, res) {
    try {
      const { name, latitude, longitude } = req.body

      if (!name || !latitude || !longitude) {
        return res.status(400).json({ error: "Missing required fields" })
      }

      const cityId = await CityModel.addCity(name, latitude, longitude)
      res.json({ message: "City added successfully", cityId })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static async getDistance(req, res) {
    try {
      const { city1, city2 } = req.body

      if (!city1 || !city2) {
        return res
          .status(400)
          .json({ error: "Both city1 and city2 are required" })
      }

      const cityA = await CityModel.getCityByName(city1)
      const cityB = await CityModel.getCityByName(city2)

      if (!cityA || !cityB) {
        return res.status(404).json({ error: "One or both cities not found" })
      }

      const distance = CityController.calculateDistance(
        cityA.latitude,
        cityA.longitude,
        cityB.latitude,
        cityB.longitude
      )

      res.json({
        city1: cityA.name,
        city2: cityB.name,
        distance: `${distance.toFixed(2)} KM`,
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  static calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371 // Earth Radius in KM
    const dLat = (lat2 - lat1) * (Math.PI / 180)
    const dLon = (lon2 - lon1) * (Math.PI / 180)

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }
}

export default CityController
