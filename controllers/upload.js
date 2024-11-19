const multer = require("multer");
const path = require("path");

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Check the type of upload and set directory accordingly
    const folder =
      req.uploadType === "profile" ? "profilePictures" : "propertyPictures";

    cb(null, path.join(__dirname, `../uploads/${folder}`));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Multer upload configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5MB
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Only jpeg, jpg, or png images are allowed!");
    }
  },
});

// Middleware to specify upload type
const setUploadType = (type) => (req, res, next) => {
  req.uploadType = type;
  next();
};

module.exports = { upload, setUploadType };
