import express from "express"
import sendOtpToUser from "../app/controllers/otpController.js"

const otpRouter = express.Router()

otpRouter.post("/send-otp", sendOtpToUser)


export default otpRouter