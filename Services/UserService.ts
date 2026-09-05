import type { CreateUserDTO } from "../DTOs/CreateUserDTO.ts";
import type { LoginUserDTO } from "../DTOs/LoginUserDTO.ts";
import { AppError } from "../Errors/AppError.ts";
import { UserModel } from "../Models/User.ts";
import { UserRegisterSchema, UserLoginSchema } from "../Schemas/user.ts";
import { ZodError } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const userService = {
    async register(data: CreateUserDTO) {
        const parseData = UserRegisterSchema.safeParse(data);

        if (!parseData.success) throw parseData.error;

        const validatedData = parseData.data as CreateUserDTO;

        const userAlreadyExists = await UserModel.findOne({ email: validatedData.email });

        if (userAlreadyExists) throw new AppError("Email already in use.");

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(validatedData.password, salt);

        const user = new UserModel({
            name: validatedData.name,
            email: validatedData.email,
            password: hashedPassword
        });
        user.save();

        return new UserModel(validatedData);
    },
    async login(data: LoginUserDTO) {
        console.log(".")
        if (!data) throw new AppError("No data received.");
        
        const user = await UserModel.findOne({ email: data.email });

        if (!user) throw new AppError("No user found with provided email address.");

        const passwordVerify = await bcrypt.compare(data.password, user.password);

        if (!passwordVerify) throw new AppError("Incorrect password.");
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: parseInt(process.env.JWT_EXPIRES) });

        return { token: token };
    },
    async list() {
        return UserModel.find();
    }
}
