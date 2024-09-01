import express, { Router } from "express";
import multer from "multer";
import * as connectController from "../controllers/connect-controller.ts";

const router: Router = express.Router();
const upload = multer({ dest: "uploads/" });

router.route("/upload")
  .post(upload.single("file"), connectController.uploadConnect);

router.route("/:userId").get(connectController.connectIndex);

export default router;
