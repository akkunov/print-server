import {NextFunction, Request, Response} from 'express';
import { parseExcel } from '../services/xlsxReader.service';
import { HttpError } from '../errors/HttpError';
import {generatePdfFromExcelData} from "../services/createPdf.service";

export async function uploadRoute(req: Request, res: Response, next: NextFunction) {
    try {
        const file = req.file;

        if (!file) {
            throw new HttpError('Файл обязателен', 400, 'BAD_REQUEST');
        }

        const {rows} =  parseExcel(file.buffer);
        const pdfBuffer  = await generatePdfFromExcelData(rows)

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="envelope.pdf"');
        return res.send(pdfBuffer); // Возвращаем PDF бинарно
    } catch (err) {
        next(err);
    }
}

