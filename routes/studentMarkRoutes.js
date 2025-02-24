import express from "express"
import StudentMarkController from "../app/controllers/studentMarkController.js"
import { verifyJWT, isAdminOrTeacher } from "../middlewares/authMiddleware.js"
const studentMarkRouter = express.Router()

studentMarkRouter.get("/", StudentMarkController.getAll)
studentMarkRouter.post(
  "/assign-marks",
  verifyJWT,
  isAdminOrTeacher,
  StudentMarkController.addStudent
)

export default studentMarkRouter
