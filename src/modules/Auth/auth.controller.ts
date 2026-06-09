import { Router } from "express";
import authService from "./auth.service";
import { validation } from "../../middleware/validation.middleware";
import * as authvalidation from "./auth.validation";
const router = Router();
router.post("/signup",validation(authvalidation.SignupSchema),authService.signup);
router.post("/login",validation(authvalidation.LoginSchema),authService.login);
export default router;