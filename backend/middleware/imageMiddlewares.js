const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");

// Define file filter function
const fileFilter = (req, file, cb) => {
  // Reject files larger than 1MB
  if (file.size > 1024 * 1024) {
    cb(new Error("File size exceeds 1MB limit"));
  } else {
    cb(null, true);
  }
};

// Improved storage function with better error handling:
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      const destination =
        req.body.type === "avatar" ? "uploads/avatars/" : "uploads/";
      // Ensure that the directory exists, create it if it doesn't
      fs.mkdir(destination, { recursive: true }, (err) => {
        if (err) {
          return cb(err);
        }
        cb(null, destination);
      });
    } catch (err) {
      console.log("error ", err);
      cb(err); // Handle errors gracefully
    }
  },
  filename: (req, file, cb) => {
    // Generate a shorter ID for the filename
    const fileId = Math.random().toString(36).substring(7);
    const newFilename = `${fileId}.${file.originalname.split(".").pop()}`;
    cb(null, newFilename);
  },
});

// Middleware for parsing FormData
const upload = multer({
  limits: {
    fileSize: 1024 * 1024, // 1MB file size limit
  },
  fileFilter: fileFilter,
  storage,
});

// Middleware for compressing images (for avatars)
const compressAvatar = (req, res, next) => {
  if (req.body.type === "avatar" && req.file) {
    sharp(req.file.path)
      .resize({ fit: "inside", width: 200, height: 200 }) // Resize image to fit inside 200x200px
      .toBuffer((err, buffer) => {
        if (err) {
          return next(err);
        }
        // Replace the original file with the compressed one
        req.file.buffer = buffer;
        next();
      });
  } else {
    next();
  }
};

module.exports = { upload, compressAvatar };
