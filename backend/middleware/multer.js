import multer from "multer";

// Set up disk storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Make sure you have an 'uploads' folder in your root directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Give each file a unique name
  },
});

// Only allow image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image!"), false); // Reject if it's not an image
  }
};

// Set up multer with storage and file filter
const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
