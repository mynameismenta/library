import express from "express";
import userRoutes from "./Routes/UserRoutes.ts";
import "./server.ts";
import { errorHandler } from "./Middlewares/error.ts";

const app = express();

app.use(express.json());
app.use("/users", userRoutes);
app.use(errorHandler);

app.listen(3000, () => {
    console.log("Listening at port 3000.");
});