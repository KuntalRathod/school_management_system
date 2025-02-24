import nodemailer from "nodemailer"

export const sendMail = async (email, mailSubject, content) => {
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
      text: content,
    }
    await transport.sendMail(mailOptions)
  } catch (error) {
    console.error("Error sending mail:", error)
    throw error
  }
}
