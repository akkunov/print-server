import {NextFunction, Request, Response} from 'express';
import { parseExcel } from '../services/xlsxReader.service';
import { HttpError } from '../errors/HttpError';
import {generatePdfFromExcelData} from "../services/createPdf.service";
import {generateNotePdfFromExcel} from "../services/createNotePdf.service";

export async function uploadRoute(req: Request, res: Response, next: NextFunction) {
    try {
        const file = req.file;

        if (!file) {
            throw new HttpError('Файл обязателен', 400, 'BAD_REQUEST');
        }

        const {rows} =  parseExcel(file.buffer);
        const pdfBuffer  = await generatePdfFromExcelData(rows)

        const pdfNoteBuffer= await generateNotePdfFromExcel(rows);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="envelope.pdf"');
        return res.json({
            pdfBuffer: Buffer.from(pdfBuffer).toString("base64"),
            pdfNoteBuffer: Buffer.from(pdfNoteBuffer).toString("base64"),
        }); // Возвращаем PDF бинарно
    } catch (err) {
        next(err);
    }
}

