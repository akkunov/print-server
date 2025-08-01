import {validate, Validator} from "../services/validator.service";

function numberField(defaultValue?: number) {
    return (value: any): number => {
        if (typeof value === 'number') return value;
        if (value === undefined && defaultValue !== undefined) return defaultValue;
        throw new Error('должен быть числом');
    };
}

function stringField() {
    return (value: any): string => {
        if (typeof value === 'string') return value;
        throw new Error('должен быть строкой');
    };
}

function booleanField(defaultValue?: boolean) {
    return (value: any): boolean => {
        if (typeof value === 'boolean') return value;
        if (value === undefined && defaultValue !== undefined) return defaultValue;
        throw new Error('должен быть boolean');
    };
}

function objectField<T>(validator: Validator<T>) {
    return (value: any): T => validate<T>(value, validator);
}



export type EnvelopeProfile = {
    name: string;
    width: number;
    height: number;
    linHeight: number;
    fontSize: number;
    isRemoveLastWord: boolean;
    lineHeight: number;
    padding: {
        top: number;
        left: number;
    };

};

export const envelopeProfileSchema: Validator<EnvelopeProfile> = {
    name: stringField(),
    width: numberField(),
    height: numberField(),
    linHeight: numberField(),
    fontSize: numberField(),
    lineHeight: numberField(),
    isRemoveLastWord: booleanField(true),
    padding: objectField({
        top: numberField(),
        left: numberField(),
    }),
};
