import express, { Router } from "express";
import multer from "multer";
import * as uploadImgController from "../controllers/uploadImg-controller.ts";

const router: Router = express.Router();
const upload = multer({ dest: "uploads/" });

//TODO: check if I still need this. 

router.route("/")
  .post(upload.single("file"), uploadImgController.uploadImgHandler);

export default router;
