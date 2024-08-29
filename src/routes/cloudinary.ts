import express, { Router } from "express";
import multer from "multer";
import * as cloudinaryController from "../controllers/cloudinary-controller.ts";

const router: Router = express.Router();
const upload = multer({ dest: "uploads/" });

router.route("/").post(upload.single("file"), cloudinaryController.uploadImg);

export default router;
