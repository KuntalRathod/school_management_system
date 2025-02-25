import express from "express"
import StudentMarkController from "../app/controllers/studentMarkController.js"
import { verifyJWT, isAdminOrTeacher, isAdminOrStudentOrTeacher } from "../middlewares/authMiddleware.js"
const studentMarkRouter = express.Router()

studentMarkRouter.get("/", isAdminOrTeacher, StudentMarkController.getAll)
studentMarkRouter.post(
  "/assign-marks",
  verifyJWT,
  isAdminOrTeacher,
  StudentMarkController.addStudent
)

studentMarkRouter.get(
  "/:id",
  verifyJWT,
  isAdminOrStudentOrTeacher,
  StudentMarkController.getStudentMarks
)

export default studentMarkRouter
