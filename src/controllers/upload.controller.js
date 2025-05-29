import createHttpError from "http-errors";

const uploadFile = (req, res, next) => {
  try {
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
