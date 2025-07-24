import {NextFunction, Request, Response, Router} from 'express';
import multer from 'multer';
import path from 'path';
import XLSX from 'xlsx';
import {fileURLToPath} from "node:url";
import {dirname} from "node:path";


export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);


const router = Router();

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../uploads'),
    filename: (_req,
               file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

export const upload = multer({
    storage: multer.memoryStorage(), // или diskStorage, если хочешь сохранять на диск
    limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB
    },
});


export async function uploadRoute(req: Request, res: Response, next: NextFunction) {
    try {
        const file = req.file;
        console.log(req.file);
        if (!file) {
            return res.status(400).json({error: 'Файл не загружен'});
        }

        // 1. Читаем буфер файла
        const workbook = XLSX.read(file.buffer,
            {
                type: 'buffer',
                dense: true,
            });

        // 2. Получаем первую таблицу (лист)
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
            blankrows: false,
            defval: '',    // дефолтное значение, чтобы избежать `undefined`
        });


        // Пример: лог первых 3 строк
        console.log('Первые строки:', rows.slice(0, 3));

        // Теперь ты можешь из этого data формировать PDF как тебе надо
        res.status(200).json({message: 'Файл прочитан', rows: rows.length});
    } catch (err) {
        console.error('Ошибка при чтении Excel:', err);
        next(err);
    }
}
