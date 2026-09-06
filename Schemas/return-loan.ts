import * as zod from "zod"

export const returnLoanSchema = zod.object({
    bookId: zod.string("bookId must be a valid string input."),
    userId: zod.string("userId must be a valid string input."),
    returnedAt: zod.coerce.date("returnedAt must be a valid data string input.")
});