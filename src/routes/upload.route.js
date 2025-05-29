import { Router } from "express";
import { multerMiddleware } from "../middlewares/multer.middleware.js";
import { uploadFile } from "../controllers/upload.controller.js";

const uploadRoute = Router();

uploadRoute.post("/send", multerMiddleware, uploadFile);

export default uploadRoute;