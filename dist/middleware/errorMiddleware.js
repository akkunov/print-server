import { HttpError } from '../errors/HttpError.js';
export function errorMiddleware(err, _req, res, _next) {
    // Обработка multer ошибки о размере файла
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(413).json({
            error: {
                message: 'Файл слишком большой. Максимальный размер: 10MB.',
                type: 'FILE_TOO_LARGE',
                ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
            },
        });
    }
    const isHttpError = err instanceof HttpError;
    const statusCode = isHttpError ? err.statusCode : 500;
    const type = isHttpError ? err.type : 'INTERNAL_ERROR';
    res.status(statusCode).json({
        error: {
            message: err.message,
            type,
            ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
        },
    });
}
