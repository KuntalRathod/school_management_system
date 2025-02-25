import path from "path"
import { fileURLToPath } from "url"
import puppeteer from "puppeteer"
import { invoiceHTML } from "../utils/invoiceHTML.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const generateInvoice = async () => {
  try {
    const invoiceHtml = invoiceHTML()

    // Launch Puppeteer in headless mode and create the PDF
    const browser = await puppeteer.launch({ headless: true })
    const page = await browser.newPage()
    await page.setContent(invoiceHtml, { waitUntil: "networkidle0" })
    const pdfPath = path.join(__dirname, "invoice.pdf")
    await page.pdf({ path: pdfPath, format: "A4", printBackground: true })
    await browser.close()
    return pdfPath
  } catch (error) {
    console.error("❌ Error generating invoice:", error)
    throw error
  }
}
