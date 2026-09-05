import mongoose from "mongoose";
import { BookSchema } from "./Book.ts";

export interface IAuthor {
    name: string;
    description: string,
    books: typeof BookSchema[]
}

const AuthorSchema = new mongoose.Schema<IAuthor>({
    name: String,
    description: String,
    books: [BookSchema]
});

export const AuthorModel = mongoose.model("book", AuthorSchema);