import express from "express";
import userRoutes from "./Routes/UserRoutes.ts";
import bookRoutes from "./Routes/BookRoutes.ts"
import loanRoutes from "./Routes/LoanRoutes.ts";

import { errorHandler } from "./Middlewares/error.ts";
import "./server.ts";

const app = express();

app.use(express.json());
app.use("/users", userRoutes);
app.use("/books", bookRoutes)
app.use("/loans", loanRoutes);

app.use(errorHandler);

app.listen(3000, () => {
    console.log("Listening at port 3000.");
});