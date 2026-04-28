import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import routes from "./routes/index.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import { fileURLToPath } from "url";
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const PORT: number = parseInt(process.env.PORT || "3001", 10);
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, '..', 'uploads');
const HOST = process.env.HOST || '0.0.0.0';

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ensure uploads
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// routes
app.use(routes);

// error handler LAST
app.use(errorMiddleware);

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(PORT, HOST, () => {
    console.log(`Server running on ${HOST}:${PORT}`);
});