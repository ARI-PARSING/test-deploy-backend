import multer from "multer";

const filterFiles = (req, file, cb) => {
  try {
    console.log("File received:", file);
    var ext = file.originalname.split(".").pop().toLowerCase();
    if (
      ext === "json" ||
      ext === "xml" ||
      ext === "txt"
    ) {
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

const upload = multer({ storage: storage, fileFilter: filterFiles }).single("file");

export { upload };
