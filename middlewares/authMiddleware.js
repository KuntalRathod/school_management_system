import jwt from "jsonwebtoken"

export const verifyJWT = (req, res, next) => {
  // Expect the token in the Authorization header in the format: "Bearer token"
  const authHeader = req.headers.authorization
  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" })
  }

  const token = authHeader.split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: "Invalid token format" })
  }

  try {
    // Verify token using your secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log("decoded", decoded)

    // Attach user data to request, e.g. email, id, etc.
    req.user = decoded

    console.log(req.user)

    next()
  } catch (error) {
    console.error("JWT verification error:", error)
    return res.status(401).json({ error: "Invalid token" })
  }
}

export const isAdmin = (req, res, next) => {
  if (req.user.usertype === "admin") {
    return next()
  }
  return res.status(403).json({ message: "Unauthorized access" })
}

export const isTeacher = (req, res, next) => {
  if (req.user.usertype === "teacher") {
    return next()
  }
  return res.status(403).json({ message: "Unauthorized access" })
}

export const isStudent = (req, res, next) => {
  if (req.user.usertype === "student") {
    return next()
  }
  return res.status(403).json({ message: "Unauthorized access" })
}

export const isAdminOrTeacher = (req, res, next) => {
  console.log(req.user)

  if (req.user.usertype === "teacher" || req.user.usertype === "admin") {
    return next()
  }
  return res.status(403).json({ message: "AAAAUnauthorized access" })
}

export const isAdminOrStudentOrTeacher = (req, res, next) => {
  if (
    req.user.usertype === "teacher" ||
    req.user.usertype === "admin" ||
    req.user.usertype === "student"
  ) {
    return next()
  }
  return res.status(403).json({ message: "Unauthorized access" })
}
