import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { bankRouter } from "./bank.routes";
 
// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();
 
const { PORT } = process.env;

const app = express();
app.use(cors());
app.use("/bank", bankRouter);

// start the Express server
app.listen(PORT, () => {
console.log(`Server running at http://localhost:${PORT}...`);
});
