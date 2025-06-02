import createHttpError from "http-errors";
import { fileConverter, fileLogs } from "../service/convertFile.service.js";
import Upload from "../utils/errors/codes/upload.codes.js";

const uploadFile = (req, res, next) => {
  try {
    console.log("File upload request received");
    fileLogs(req.file?.path, req.body.key);
    return res.status(200).send({
      message: "File uploaded successfully",
      path: req.file?.path,
      file: req.file,
    });
  } catch (e) {
    switch (e.code) {
      case Upload.PROCESSINGFILE_ERROR:
        next(createHttpError(500, "Error processing file"));
        break;
      case Upload.UPLOAD_FILE_TYPE_NOT_SUPPORTED:
        next(createHttpError(400,"Unsupported file type. Please upload a valid file."));
        break;
      default:
        next(e);
    }
  }
};

export { uploadFile };
