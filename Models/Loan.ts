import mongoose, { type ObjectId } from "mongoose";

export interface ILoan {
    userId: ObjectId,
    bookId: ObjectId,
    borrowedAt: Date,
    dueDate: Date,
    returnedAt: Date | null,
    status: string
}

const LoanSchema = new mongoose.Schema<ILoan>({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book"
    },
    borrowedAt: Date,
    dueDate: Date,
    returnedAt: Date || null,
    status: {
        type: String,
        enum: ["active", "returned"]
    }
});

export const LoanModel = mongoose.model("loan", LoanSchema);