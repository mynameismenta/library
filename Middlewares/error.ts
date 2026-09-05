// middlewares/errorHandler.ts
import type { Request, Response, NextFunction } from "express";
import { AppError } from "../Errors/AppError.ts";
import { ZodError } from "zod";

export function errorHandler(
    error: Error, 
    req: Request, 
    res: Response, 
    next: NextFunction
) {
    if (error instanceof AppError) {
        res.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
        return;
    }
    if (error instanceof ZodError) {
        res.status(400).json(error.issues.map(issue => ({ message: issue.message, path: issue.path })));
        return;
    }

    console.error(error);

    res.status(500).json({
        status: "error",
        message: "Server side error."
    });
}