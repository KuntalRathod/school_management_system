import { randomInt } from "crypto"
import { sendMail } from "../../helpers/sendMail.js"

async function sendOtpToUser(req, res) {
  try {
    // Generate a random 6-digit OTP
    const otp = randomInt(100000, 999999)
    // Extract the email from the request body
    const { email } = req.body
    // Send the OTP to the user's email
    await sendMail(email, "OTP for password reset", `Your OTP is: ${otp}`)
    res.status(200).json({ message: "OTP sent successfully" })
  } catch (error) {
    console.error("Error sending OTP:", error)
    res.status(500).json({ error: error.message })
  }
}

export default sendOtpToUser