import type { Request, Response } from "express";
import { bookService } from "../Services/BookService.ts";
import type { CreateBookDTO } from "../DTOs/CreateBookDTO.ts";
import type { ListBooksDTO } from "../DTOs/ListBooksDTO.ts";

export const bookController = {
    async create(req: Request, res: Response) {
        const book = await bookService.create(req.body);
        return res.status(200).json(book);
    },
    async list(req: Request, res: Response) {
        const bookList = await bookService.list(req.query);
        const statusCode = bookList.length > 0 ? 200 : 204;

        res.status(statusCode).json(bookList);
    }
};