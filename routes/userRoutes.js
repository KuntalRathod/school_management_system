import UserController from "../app/controllers/userController.js"
import express from "express"
import {
  isAdminOrStudentOrTeacher,
  isAdminOrTeacher,
  isStudent,
  verifyJWT,
} from "../middlewares/authMiddleware.js"

const userRouter = express.Router()

// Route to get all users with optional pagination
userRouter.get(
  "/getall",
  verifyJWT,
  isAdminOrTeacher,
  UserController.getAllUsers
)

// Route to get a user by ID
userRouter.get(
  "/:id",
  verifyJWT,
  isAdminOrStudentOrTeacher,
  UserController.getUserById
)

// Route to update a user by ID
userRouter.put(
  "/update/:id",
  verifyJWT,
  isAdminOrTeacher,
  UserController.updateUserById
)

// Route to delete a user by ID
userRouter.delete(
  "/delete/:id",
  verifyJWT,
  isAdminOrTeacher,
  UserController.deleteUserById
)

// Route to get user count based on age groups
userRouter.get(
  "/age-groups/count",
  verifyJWT,
  isAdminOrTeacher,
  UserController.getUsersCountByAgeGroups
)

export default userRouter
