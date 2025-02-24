import express from "express"
import AuthController from "../app/controllers/authController.js"
// import passport from "../config/passportConfig.js"
import upload from "../utils/multer.js"

const authRouter = express.Router()

// Regular authentication
authRouter.post(
  "/register",
  upload.single("profileImage"),
  AuthController.createUser
)
authRouter.post("/login", AuthController.login)

// Facebook authentication routes
// authRouter.get("/facebook", AuthController.facebookAuth)
// authRouter.get("/facebook/callback", AuthController.facebookCallback)

export default authRouter
