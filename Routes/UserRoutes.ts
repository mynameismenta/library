import express from "express";
import { userController } from "../Controllers/UserController.ts";
import { auth } from "../Middlewares/auth.ts";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/", auth, userController.list);

export default router;