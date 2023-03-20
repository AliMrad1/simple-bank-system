import * as dotenv from "dotenv";
import cors from "cors";
import express, { Express } from "express";
import { bankRouter } from "./routes/bank.routes";
 
// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();
 
const PORT = process.env.PORT;

const server: Express = express();


function startServer(){

    server.use(cors());
    server.use("/bank", bankRouter);

    // start the Express server
    server.listen(5200, () => {
    console.log(`Server running at http://localhost:${PORT}...`);
    });
}

startServer();