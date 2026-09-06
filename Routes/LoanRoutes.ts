import express from "express";
import { loanController } from "../Controllers/LoanController.ts";

const router = express.Router();

router.get("/{:id}", loanController.list);
router.post("/", loanController.loan);
//router.patch("/:id/return", loanController.return);

export default router;