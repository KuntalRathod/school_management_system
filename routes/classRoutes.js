import express from "express"
import ClassController from "../app/controllers/classController.js"
import { isAdminOrTeacher, verifyJWT } from "../middlewares/authMiddleware.js"

const classRouter = express.Router()

classRouter.get(
  "/getall",
  verifyJWT,
  isAdminOrTeacher,
  ClassController.getAllClasses
)
classRouter.post("/create", verifyJWT, isAdminOrTeacher,ClassController.createClass)

export default classRouter
