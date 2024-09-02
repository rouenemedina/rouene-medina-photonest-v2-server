import express, { Router } from "express";
import * as userCheckerController from "../controllers/userChecker-controller.ts";

const router: Router = express.Router();

router.route("/:user_id").get(userCheckerController.userChecker);

export default router;
