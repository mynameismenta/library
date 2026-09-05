import type { Request, Response } from "express";
import { bookService } from "../Services/BookService.ts";
import type { CreateBookDTO } from "../DTOs/CreateBookDTO.ts";
import type { ListBooksDTO } from "../DTOs/ListBooksDTO.ts";

export const bookController = {
    async create(req: Request<{}, {}, CreateBookDTO>, res: Response) {
        const book = await bookService.create(req.body);
        return res.status(200).json(book);
    },
    async list(req: Request<{}, {}, {}, ListBooksDTO>, res: Response) {
        console.log("teste")
        const bookList = await bookService.list(req.query);

        res.status(200).json(bookList);
    }
};