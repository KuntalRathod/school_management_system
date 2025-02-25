import rateLimit from "express-rate-limit"

export const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 50, // limit each IP to 10 requests per minute
  message: "You have exceeded the 50 requests in 1 minute limit!",
})
