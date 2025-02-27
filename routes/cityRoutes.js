import express from "express"
import CityController from "../app/controllers/cityController.js"


const cityRouter = express.Router()

cityRouter.post("/add-city", CityController.addCities)
cityRouter.post("/distance", CityController.getDistance) 

export default cityRouter