import { AuthController } from "app/controllers/auth.controller";
import { verifyToken } from "app/middleware/checkJWT";
import { Router } from "express";

const router = Router();

const authController = new AuthController();
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/update-profile", verifyToken, authController.updateProfile);

export default router;
