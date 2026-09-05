import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { AppError } from "../Errors/AppError.ts";

export function auth(
    req: Request, 
    res: Response, 
    next: NextFunction
) {
    const token = req.headers.authorization?.replaceAll("Bearer ", "");

    if (!token) throw new AppError("Invalid Token!", 403);

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) throw new AppError("Invalid Token!", 403);

        res.locals.token = decodedToken
        
        return next();
    } catch(e) {
        res.status(403).json({ message: e });
    }
};