import express from "express"
import AuthController from "../app/controllers/authController.js"
import upload from "../utils/multer.js"

const authRouter = express.Router()

authRouter.post(
  "/register",
  upload.single("profileImage"),
  AuthController.createUser
)
authRouter.post("/login", AuthController.login)


export default authRouter
