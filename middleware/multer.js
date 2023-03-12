// Multer adds a body object and a file or files object to the request object

const multer = require("multer");
const path = require("path");

module.exports = multer({
  // Not storing data locally
  storage: multer.diskStorage({}),
  // checking what type of data is uploaded
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
