import mongoose from "mongoose";
import type { ListLoansDTO } from "../DTOs/ListLoansDTO.ts";
import type { LoanBookDTO } from "../DTOs/LoanBookDTO.ts";
import { AppError } from "../Errors/AppError.ts";
import { BookModel } from "../Models/Book.ts";
import { LoanModel } from "../Models/Loan.ts";
import { UserModel } from "../Models/User.ts";
import { LoanSchema } from "../Schemas/loan.ts";

export const loanService = {
    async list(data?: ListLoansDTO) {
        let loans = await LoanModel.find();

        if (data?.id) return loans.filter(loan => loan.bookId.toString() === data.id);

        return loans
    },
    async loan(data?: LoanBookDTO) {
        const tryParse = LoanSchema.safeParse(data);
        if (!tryParse.success) throw tryParse.error;

        const parsedData = tryParse.data;

        if (!mongoose.Types.ObjectId.isValid(parsedData.bookId)) 
            throw new AppError("Specified bookId isn't a valid id.");
        if (!mongoose.Types.ObjectId.isValid(parsedData.userId))
            throw new AppError("Specified userId isn't a valid id.")

        const targetBook = await BookModel.findById(parsedData.bookId);
        const targetUser = await UserModel.findById(parsedData.userId);

        if (!targetBook) throw new AppError("Specified book doesn't exists.");
        if (!targetUser) throw new AppError("Specified user doesn't exists.");
        if (!targetBook?.available || targetBook.copies === 0) throw new AppError("Specified book has no available copies.");
        
        const bookLoans = await LoanModel.find();
        const userAlreadyBorrowed = bookLoans.filter(loan => loan.bookId.toString() === targetBook.id && loan.userId.toString() === targetUser.id);

        if (userAlreadyBorrowed) throw new AppError("User already in own of this book.")

        const copies = targetBook.copies--;

        if (copies === 0) targetBook.updateOne({ available: false });
        targetBook.updateOne({ copies });
        targetBook.save();

        const dueDate = new Date(parsedData.borrowedAt);
        dueDate.setDate(dueDate.getDate() + 30);

        const loan = new LoanModel({
            bookId: targetBook.id,
            userId: parsedData.userId,
            borrowedAt: parsedData.borrowedAt,
            dueDate
        });
        loan.save();

        return loan;
    }
};