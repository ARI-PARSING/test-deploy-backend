import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join("uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const filterFiles = (req, file, cb) => {
  try {
    var ext = file.originalname.split(".").pop().toLowerCase();
    if (ext === "json" || ext === "xml" || ext === "txt") {
      cb(null, true);
    } else {
      cb(new Error("File type not allowed"), false);
    }
  } catch (error) {
    console.error("Error in file filter:", error);
    cb(new Error("File type not allowed"), false);
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

const multerMiddleware = multer({ storage: storage, fileFilter: filterFiles }).single(
  "file"
);

export { multerMiddleware };
