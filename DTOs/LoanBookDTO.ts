import type { ObjectId } from "mongoose";

export interface LoanBookDTO {
    userId?: ObjectId,
    bookId?: ObjectId,
    borrowedAt?: string,
}