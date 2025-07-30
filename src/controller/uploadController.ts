import {NextFunction, Request, Response} from 'express';
import { parseExcel } from '../services/xlsxReader.service';
import { HttpError } from '../errors/HttpError';
import {generatePdfFromExcelData} from "../services/createPdf.service";
import {type} from "node:os";


// export const __filename = fileURLToPath(import.meta.url);
// export const __dirname = dirname(__filename);
//
//
//
// const storage = multer.diskStorage({
//     destination: path.join(__dirname, '../../uploads'),
//     filename: (_req,
//                file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     },
// });


export async function uploadRoute(req: Request, res: Response, next: NextFunction) {
    try {
        const file = req.file;

        if (!file) {
            throw new HttpError('Файл обязателен', 400, 'BAD_REQUEST');
        }

        const { sheetName, rows } =  parseExcel(file.buffer);
        const pdfBuffer  = await generatePdfFromExcelData(rows)

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="envelope.pdf"');
        return res.send(pdfBuffer); // Возвращаем PDF бинарно
    } catch (err) {
        console.error('Ошибка при чтении Excel:', err);
        next(err);
    }
}

