import * as zod from "zod";

export const LoanSchema = zod.object({
    userId: zod.string("userId must be a string."),
    bookId: zod.string("bookId must be a string."),
    borrowedAt: zod.coerce.date("borrowedAt must be a valid string date."),
});