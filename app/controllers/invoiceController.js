import { sendMail } from "../../helpers/sendMail.js"
import { generateInvoice } from "../../helpers/generateInvoice.js"

export const sendInvoice = async (req, res) => {
  const { email } = req.body
  if (!email) return res.status(400).json({ error: "Email is required" })

  try {
    // Generate PDF
    const pdfPath = await generateInvoice()

    // Email Content
    const emailContent = `
      <h2>Invoice #0001</h2>
      <p>Dear Customer,</p>
      <p>Attached is your invoice. Please find the details below:</p>
      <ul>
        <li>Company: XYZ Inc.</li>
        <li>Invoice Total: <strong>$5000</strong></li>
      </ul>
      <p>Thank you for your business!</p>
    `

    // Send Email
    await sendMail(email, "Your Invoice #0001", emailContent, pdfPath)
    res.status(200).json({ message: "Invoice sent successfully!" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
