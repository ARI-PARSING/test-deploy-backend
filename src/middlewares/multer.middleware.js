import multer from "multer";
import path from "path";
import fs from "fs";
import createHttpError from "http-errors";

const uploadDir = path.join("uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const filterFiles = (req, file, cb) => {
  try {
    var ext = file.originalname.split(".").pop().toLowerCase();
    if (ext === "json" || ext === "xml" || ext === "txt" || ext === "csv") {
      cb(null, true);
    } else {
      cb(createHttpError(400, "File type not allowed"), false);
    }
  } catch (error) {
    console.error("Error in file filter:", error);
    cb(createHttpError(500, "Internal Server Error"), false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

const multerMiddleware = multer({
  storage: storage,
  fileFilter: filterFiles,
}).single("file");

export { multerMiddleware };
