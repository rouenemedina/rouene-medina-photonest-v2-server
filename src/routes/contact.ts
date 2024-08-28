import express, { Router } from "express";
import * as contactController from "../controllers/contact-controller.ts";

const router: Router = express.Router();

router.route("/").post(contactController.addCommentMsg);

export default router;