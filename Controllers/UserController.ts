import type { Request, Response } from "express";
import type { CreateUserDTO } from "../DTOs/CreateUserDTO.ts";
import type { LoginUserDTO } from "../DTOs/LoginUserDTO.ts";
import { userService } from "../Services/UserService.ts";

export const userController = {
    async register(req: Request<{}, {}, CreateUserDTO>, res: Response) {
        const user = await userService.register(req.body);
        res.json(user);
    },
    async login(req: Request<{}, {}, LoginUserDTO>, res: Response) {
        const result = await userService.login(req.body);
        res.json(result);
    },
    async list(req: Request, res: Response) {
        const userList = await userService.list();
        res.json(userList);
    }
};