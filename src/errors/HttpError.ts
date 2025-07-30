export type ErrorType =
    | 'BAD_REQUEST'
    | 'NOT_FOUND'
    | 'UNAUTHORIZED'
    | 'VALIDATION_ERROR'
    | 'INTERNAL_ERROR'
    | 'FILE_TOO_LARGE'
    | 'UNSUPPORTED_MEDIA_TYPE'
    | 'EXCEL_PARSE_ERROR'
    | 'CUSTOM'; // для кастомных

export class HttpError extends Error {
    statusCode: number;
    type: ErrorType;

    constructor(message: string, statusCode = 500, type: ErrorType = 'INTERNAL_ERROR') {
        super(message);
        this.statusCode = statusCode;
        this.type = type;

        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
