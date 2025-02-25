import nodemailer from "nodemailer"
import fs from "fs/promises"
import dotenv from "dotenv"

dotenv.config()

export const sendMail = async (email, subject, html, pdfPath) => {
  try {
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    const pdfAttachment = await fs.readFile(pdfPath)

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject,
      html,
      attachments: [{ filename: "invoice.pdf", content: pdfAttachment }],
    }

    await transport.sendMail(mailOptions)
    console.log("📩 Email sent successfully!")

    return pdfPath
  } catch (error) {
    console.error("❌ Error sending mail:", error)
    throw error
  }
}
