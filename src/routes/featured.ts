import express, { Router } from "express";
import multer from "multer";
import * as featuredController from "../controllers/featured-controller.ts";

const router: Router = express.Router();
const upload = multer({ dest: "uploads/" });

router.route("/upload")
  .post(upload.array("files", 10), featuredController.uploadFeatured);

router.route("/:userId").get(featuredController.featuredIndex);

export default router;
