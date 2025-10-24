import {validate, Validator} from "../services/validator.service.js";
import {HttpError} from "../errors/HttpError.js";

function numberField(defaultValue?: number) {
    return (value: any): number => {
        if (typeof value === 'number') return value;
        if (value === undefined && defaultValue !== undefined) return defaultValue;
        throw new HttpError('должен быть числом', 400 , 'BAD_REQUEST');
    };
}

function stringField() {
    return (value: any): string => {
        if (typeof value === 'string') return value;
        throw new HttpError('должен быть строкой', 400, 'BAD_REQUEST');
    };
}

function booleanField(defaultValue?: boolean) {
    return (value: any): boolean => {
        if (typeof value === 'boolean') return value;
        if (value === undefined && defaultValue !== undefined) return defaultValue;
        throw new HttpError('должен быть boolean', 400, 'BAD_REQUEST');
    };
}

function objectField<T>(validator: Validator<T>) {
    return (value: any): T => validate<T>(value, validator);
}



export type EnvelopeProfile = {
    name: string;
    width: number;
    height: number;
    fontSize: number;
    lineHeight: number;
    isRemoveLastWord: boolean;
    using:boolean;
    paddingTop: number
    paddingLeft: number;

};

export const envelopeProfileSchema: Validator<EnvelopeProfile> = {
    name: stringField(),
    width: numberField(),
    height: numberField(),
    lineHeight: numberField(),
    fontSize: numberField(),
    isRemoveLastWord: booleanField(true),
    using:booleanField(false),
    paddingTop:numberField(),
    paddingLeft:numberField(),
};
