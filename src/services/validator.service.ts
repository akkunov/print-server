export type Validator<T> = {
    [K in keyof T]: (value: any) => T[K];
};

export function validate<T>(data: any, schema: Validator<T>): T {
    if (typeof data !== 'object' || data === null) {
        throw new Error('Ожидался объект');
    }

    const result = {} as T;

    for (const key in schema) {
        try {
            const parser = schema[key];
            result[key] = parser(data[key]);
        } catch (err: any) {
            throw new Error(`Поле "${key}": ${err.message}`);
        }
    }

    return result;
}
