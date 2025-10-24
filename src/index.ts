import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import routes from "./routes/index.js";
import {errorMiddleware} from "./middleware/errorMiddleware.js";
import {fileURLToPath} from "url";
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

const app = express();



const PORT:number =parseInt(process.env.PORT || "3001", 10);
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, '..', 'uploads');
const HOST = process.env.HOST || '127.0.0.1';
console.log(__dirname)

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
