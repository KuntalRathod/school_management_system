import express from "express"
import apicache from "apicache"
import StudentMarkController from "../app/controllers/studentMarkController.js"
import {
  verifyJWT,
  isAdminOrTeacher,
  isAdminOrStudentOrTeacher,
} from "../middlewares/authMiddleware.js"
const studentMarkRouter = express.Router()

const cache = apicache.middleware

studentMarkRouter.get(
  "/",
  verifyJWT,
  isAdminOrTeacher,
  cache("5 minutes"),
  StudentMarkController.getAll
)
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
