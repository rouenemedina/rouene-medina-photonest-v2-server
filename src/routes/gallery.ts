import express, { Router } from "express";
import multer from "multer";
import * as galleryController from "../controllers/gallery-controller.ts";

const router: Router = express.Router();
const upload = multer({ dest: "uploads/" });

router.route("/upload")
  .post(upload.array("files", 100), galleryController.galleryUpload);

router.route("/:userId").get(galleryController.galleryIndex);

export default router;
