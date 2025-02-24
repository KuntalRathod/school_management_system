import express from "express"
import { sendInvoice } from "../app/controllers/invoiceController.js"

const invoiceRouter = express.Router()

// Route to send invoice
invoiceRouter.post("/send-invoice", sendInvoice)

export default router
