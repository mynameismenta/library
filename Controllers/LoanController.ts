import type { Request, Response } from "express";
import { loanService } from "../Services/LoanService.ts";

export const loanController = {
    async list(req: Request, res: Response) {
        const loans = await loanService.list(req.body);
        return res.json(loans);
    },
    async loan(req: Request, res: Response) {
        const loan = await loanService.loan(req.body);
        return res.json(loan);
    }
};