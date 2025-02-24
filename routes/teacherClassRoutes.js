import express from "express"
import TeacherClassController from "../app/controllers/teacherClassController.js"
import { isAdminOrTeacher, verifyJWT } from "../middlewares/authMiddleware.js"

const teacherClassRouter = express.Router()

teacherClassRouter.get(
  "/getall",
  verifyJWT,
  isAdminOrTeacher,
  TeacherClassController.getAllTeacherClasses
)

teacherClassRouter.post(
  "/create",
  verifyJWT,
  isAdminOrTeacher,
  TeacherClassController.createTeacherClass
)

export default teacherClassRouter
