import * as zod from "zod";

export const BookRegisterSchema = zod.object({
    name: zod.string().min(3, "Books's title too small.").nonempty("Book's name required."),
    author: zod.string(),
    description: zod.string().min(10, "Book's description must contain atleast 10 chars."),
    pages: zod.number().min(5, "Book must contain atleast five pages."),
    available: zod.boolean(),
    copies: zod.number().min(1)
});