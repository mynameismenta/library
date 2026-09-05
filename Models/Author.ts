import mongoose from "mongoose";
import { BookModel } from "./Book.ts";

export interface IAuthor {
    name: string;
    description: string,
    books: typeof BookModel[]
}

const AuthorSchema = new mongoose.Schema<IAuthor>({
    name: String,
    description: String,
    books: [BookModel]
});

export const AuthorModel = mongoose.model("book", AuthorSchema);