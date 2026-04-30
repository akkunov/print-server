import {HttpError} from "../errors/HttpError.js";

export function safeJsonParse<T>(value: string): T {
    try {
        return JSON.parse(value);
    } catch {
        throw new HttpError('Повреждённый JSON файл', 500, 'BAD_JSON');
    }
}