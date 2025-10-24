// middleware/validateFile.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/HttpError.js';

export function validateExcelFile(req: Request, res: Response, next: NextFunction) {
    const file = req.file;
    const allowedTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
    ];

    if (!file) {
        return next(new HttpError('Файл обязателен', 400, 'BAD_REQUEST'));
    }

    if (!allowedTypes.includes(file.mimetype)) {
        return next(new HttpError('Неподдерживаемый формат файла', 415, 'UNSUPPORTED_MEDIA_TYPE'));
    }

    next();
}
