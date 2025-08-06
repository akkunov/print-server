import {HttpError} from "../errors/HttpError";

export type Validator<T> = {
    [K in keyof T]: (value: any) => T[K];
};

export function validate<T>(data: any, schema: Validator<T>): T {
    if (typeof data !== 'object' || data === null) {
        throw new HttpError('Ожидался объект' ,400, 'BAD_REQUEST');
    }

    const result = {} as T;

    for (const key in schema) {
        try {
            const parser = schema[key];
            result[key] = parser(data[key]);
        } catch (err: any) {
            throw new HttpError(`Поле "${key}": ${err.message}`, 400, 'BAD_REQUEST');
        }
    }

    return result;
}
