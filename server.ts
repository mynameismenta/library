import mongoose from "mongoose";

import * as dotenv from "dotenv";
dotenv.config();

main().catch(err => console.log(err));

async function main() {
    mongoose.connect(process.env.DATABASE_URL).then(() => console.log("Connected to MongoDB Atlas."));
}