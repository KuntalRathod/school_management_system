import rateLimit from "express-rate-limit"

export const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 2, // limit each IP to 10 requests per minute
  message: "You have exceeded the 2 requests in 1 minute limit!",
})
