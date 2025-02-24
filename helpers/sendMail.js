import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

export const sendMail = async (email, mailSubject, content, pdfPath) => {
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

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: mailSubject,
      html: content, // Send as HTML
      attachments: [
        {
          filename: "invoice.pdf",
          path: pdfPath,
          contentType: "application/pdf",
        },
      ],
    }

    await transport.sendMail(mailOptions)
    console.log("Email sent successfully!")
  } catch (error) {
    console.error("Error sending mail:", error)
    throw error
  }
}
