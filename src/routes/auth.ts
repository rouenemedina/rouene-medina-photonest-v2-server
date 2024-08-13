import express, { Router } from "express";
import * as authController from "../controllers/auth-controller.ts";

const router: Router = express.Router();

router.route("/register").post(authController.userRegistration);

router.route("/login").post(authController.userLogin);

router
  .route("/profile")
  .get(authController.verifyToken, authController.getUser);

export default router;
