import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export function auth(
    req: Request, 
    res: Response, 
    next: NextFunction
) {
    const token = req.headers.authorization?.replaceAll("Bearer ", "");

    if (!token) return res.status(403).json({ message: "Invalid token!" });

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) return res.status(403).json({ message: "Invalid token!" });

        res.locals.token = decodedToken
        
        return next();
    } catch(e) {
        res.status(403).json({ message: e });
    }
};