import express from "express";
import { bookController } from "../Controllers/BookController.ts";
import { auth } from "../Middlewares/auth.ts";

const router = express.Router();

router.get("/{:search}", bookController.list)
router.post("/register", auth, bookController.create)


export default router;