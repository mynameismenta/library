export class AppError extends Error {
    public readonly statusCode: number;

    constructor(err: string, statusCode = 400) {
        super(err);
        this.statusCode = statusCode;
    }
}
