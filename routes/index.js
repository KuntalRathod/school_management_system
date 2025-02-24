import { sendInvoice } from "../app/controllers/invoiceController.js"
import authRouter from "./authRoutes.js"
import classRouter from "./classRoutes.js"
import otpRouter from "./otpRoutes.js"
import studentClassRouter from "./studentClassRoutes.js"
import studentMarkRouter from "./studentMarkRoutes.js"
import subjectRouter from "./subjectRoutes.js"
import teacherClassRouter from "./teacherClassRoutes.js"
import userRouter from "./userRoutes.js"

const initializeRouter = (app) => {
  app.use("/users", userRouter)
  app.use("/auth", authRouter)
  app.use("/classes", classRouter)
  app.use("/students", studentClassRouter)
  app.use("/subjects", subjectRouter)
  app.use("/teachers", teacherClassRouter)
  app.use("/otp", otpRouter)
  app.use("/marks", studentMarkRouter)
  app.use("/invoice", sendInvoice)
}
export default initializeRouter
