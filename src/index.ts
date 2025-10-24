import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import dotenv from "dotenv";
import routes from "./routes";
import {fileURLToPath} from "node:url";
import { dirname } from 'node:path';
import {errorMiddleware} from "./middleware/errorMiddleware";



export const __FILENAME = fileURLToPath(import.meta.url);
export const __DIRNAME = dirname(__FILENAME);
console.log(__DIRNAME);
dotenv.config();

const app = express();




const PORT:number =parseInt(process.env.PORT || "3001", 10);
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, '..', 'uploads');
const HOST = process.env.HOST || '127.0.0.1';

app.use(cors({
    origin: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use(routes);
app.use(errorMiddleware);


// Ensure uploads directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR);
}

app.listen(PORT,'0.0.0.0',  () => {
    console.log(PORT,HOST)
} );
