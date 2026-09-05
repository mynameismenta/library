import type { IUser } from "./IUser.ts";
import mongoose from "mongoose";

const User = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

export const UserModel = mongoose.model("user", User);