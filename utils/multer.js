import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads") // make sure this folder exists
  },
  filename: function (req, file, cb) {
    // Get file extension
    const ext = path.extname(file.originalname)
    // Generate filename without original file name
    cb(null, Date.now() + ext)
  },
})

const fileFilter = (req, file, cb) => {
  // Accept any file with a mimetype that starts with "image/"
  if (file.mimetype.startsWith("image/")) {
    cb(null, true)
  } else {
    cb(new Error("Only image files are allowed!"), false)
  }
}

const upload = multer({
  storage,
  fileFilter,
})

export default upload
