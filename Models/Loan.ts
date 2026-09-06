import mongoose, { Schema, model } from "mongoose";

export interface ILoan {
    userId: mongoose.Types.ObjectId;
    bookId: mongoose.Types.ObjectId;
    borrowedAt: Date;
    dueDate: Date;
    returnedAt: Date | null;
    status: string;
}

const LoanSchema = new Schema<ILoan>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: "book",
        required: true
    },
    borrowedAt: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    // No Schema do Mongoose, para aceitar null ou Date, basta definir como Date
    returnedAt: { type: Date, default: null },
    status: {
        type: String,
        enum: ["active", "returned"],
        required: true
    }
});

export const LoanModel = model<ILoan>("loan", LoanSchema);
