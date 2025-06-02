import createHttpError from "http-errors";
import { fileConverter, fileLogs } from "../service/convertFile.service.js";

const uploadFile = (req, res, next) => {
  try {
    console.log("File upload request received");
    fileLogs(req.file?.path, req.body.key)
    return res.status(200).send({
      message: "File uploaded successfully",
      path: req.file?.path,
      file: req.file,
    });
  } catch (e) {
    switch (e.code) {
      default:
        next(e);
    }
  }
};

export { uploadFile };
