import express from "express"
import upload from ".././utils/multer.js"
import ExcelController from "../app/controllers/excelController.js"

const excelRouter = express.Router()

excelRouter.post("/upload", upload.single("file"), ExcelController.uploadFile)

export default excelRouter
