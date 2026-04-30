import {EnvelopeProfile} from "../../schema/envelopeProfileSchema.js";

import {HttpError} from "../../errors/HttpError.js";
import fs from 'node:fs/promises';
import {safeJsonParse} from "../../utils/safeJsonParse.js";
import {NOTE_FILE_PATH} from "../../configs/paths.js";

export async function readProfiles(): Promise<EnvelopeProfile[]> {
    try {
        const file = await fs.readFile(NOTE_FILE_PATH, 'utf-8');
        return safeJsonParse<EnvelopeProfile[]>(file);
    } catch (err) {
        throw new HttpError('Ошибка чтения файла', 500, 'INTERNAL_ERROR');
    }
}