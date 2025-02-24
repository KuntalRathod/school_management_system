import PdfPrinter from "pdfmake"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Fix: Use Built-in Fonts (No Need for External Files)
const fonts = {
  Roboto: {
    normal: "Helvetica",
    bold: "Helvetica-Bold",
  },
}

const printer = new PdfPrinter(fonts)

export const generateInvoice = async () => {
  return new Promise((resolve, reject) => {
    const docDefinition = {
      content: [
        { text: "Invoice #0001", fontSize: 20, bold: true },
        {
          text: "Company Name: XYZ Inc.\nClient Name: Your Client",
          margin: [0, 10, 0, 10],
        },
        {
          table: {
            widths: ["*", "auto", "auto", "auto"],
            body: [
              ["Description", "Unit Cost", "QTY", "Amount"],
              ["Item 1", "$0", "1", "$0"],
              ["Item 2", "$0", "1", "$0"],
            ],
          },
        },
        {
          text: "Total: $5000",
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 0],
        },
      ],
    }

    const pdfPath = path.join(__dirname, "invoice.pdf")
    const pdfDoc = printer.createPdfKitDocument(docDefinition)
    pdfDoc.pipe(fs.createWriteStream(pdfPath))
    pdfDoc.end()

    pdfDoc.on("finish", () => resolve(pdfPath))
    pdfDoc.on("error", reject)
  })
}
