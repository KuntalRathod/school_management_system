import express from "express"
import StudentClassController from "../app/controllers/studentClassController.js"
import { isAdminOrTeacher, verifyJWT } from "../middlewares/authMiddleware.js"

const studentClassRouter = express.Router()

studentClassRouter.get(
  "/getall",
  verifyJWT,
  isAdminOrTeacher,
  StudentClassController.getAllStudentClasses
)

studentClassRouter.post(
  "/create",
  verifyJWT,
  isAdminOrTeacher,
  StudentClassController.createStudentClass
)

export default studentClassRouter


