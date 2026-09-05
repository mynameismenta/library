import mongoose from "mongoose";

export interface IBook {
    name: string
    author: string
    pages: number
    available: boolean
    copies: number;
}

const BookSchema = new mongoose.Schema<IBook>({
    name: String,
    author: String,
    pages: Number,
    available: Boolean,
    copies: Number
});

export const BookModel = mongoose.model("book", BookSchema);