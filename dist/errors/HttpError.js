export class HttpError extends Error {
    statusCode;
    type;
    constructor(message, statusCode = 500, type = 'INTERNAL_ERROR') {
        super(message);
        this.statusCode = statusCode;
        this.type = type;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
