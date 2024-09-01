import express, { Router } from "express";
import multer from "multer";
import * as aboutController from "../controllers/about-controller.ts";

const router: Router = express.Router();
const upload = multer({ dest: "uploads/" });

router.route("/upload")
  .post(upload.array("files", 10), aboutController.uploadAbout);

router.route("/userId").get(aboutController.aboutIndex);

export default router;
