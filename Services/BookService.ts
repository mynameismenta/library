import type { CreateBookDTO } from "../DTOs/CreateBookDTO.ts";
import type { ListBooksDTO } from "../DTOs/ListBooksDTO.ts";
import { BookModel, type IBook } from "../Models/Book.ts"
import { BookRegisterSchema } from "../Schemas/book.ts";

export const bookService = {
    async create(data: CreateBookDTO) {
        const parsedData = BookRegisterSchema.safeParse(data);
        if (!parsedData.success) throw parsedData.error

        const validatedData = parsedData.data as CreateBookDTO;

        const book = new BookModel({
            author: validatedData.author,
            name: validatedData.name,
            copies: validatedData.copies,
            available: validatedData.available,
            pages: validatedData.pages
        });

        book.save();
        return book;
    },
    async list(data?: ListBooksDTO) {
        let books = await BookModel.find();

        if (data?.name) 
            books = books.filter(x => x.name.toLowerCase().includes(data.name!.toLowerCase()));
        if (data?.author)
            books = books.filter(x => x.author.toLowerCase().includes(data.author!.toLowerCase()));
        if (data?.pages)
            books = books.filter(x => x.pages <= data.pages!);

        return books;
    }
}