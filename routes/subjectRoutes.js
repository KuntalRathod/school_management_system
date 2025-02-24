import express from "express"
import SubjectController from "../app/controllers/subjectController.js"
import { verifyJWT } from "../middlewares/authMiddleware.js"

const subjectRouter = express.Router()

subjectRouter.get("/getall", verifyJWT, SubjectController.getAllSubjects)
subjectRouter.post("/create", verifyJWT, SubjectController.createSubject)

export default subjectRouter
