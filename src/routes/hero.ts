import express, { Router } from "express";
import multer from "multer";
import * as heroController from "../controllers/hero-controller.ts";

const router: Router = express.Router();
const upload = multer({ dest: "uploads/" });

router.route("/upload")
  .post(upload.single("file"), heroController.uploadHero);

router.route("/:userId").get(heroController.heroIndex);

export default router;
