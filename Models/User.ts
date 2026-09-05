import mongoose from "mongoose";
import { BookModel } from "./Book.ts";

export interface IUser {
    name: string,
    email: string,
    password: string,
    isAdmin: boolean,
    loans: typeof BookModel
};

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
    },
    isAdmin: Boolean,
    loans: {
        type: BookModel
    }
});

export const UserModel = mongoose.model("user", User);