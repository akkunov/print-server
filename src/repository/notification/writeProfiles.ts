import {HttpError} from "../../errors/HttpError.js";
import {EnvelopeProfile} from "../../schema/envelopeProfileSchema.js";
import fs from "node:fs/promises";
import {NOTE_FILE_PATH} from "../../configs/paths.js";

export async function writeProfiles(profiles: EnvelopeProfile[]): Promise<void> {
    try {
        await fs.writeFile(NOTE_FILE_PATH, JSON.stringify(profiles, null, 2), 'utf-8');
    } catch (err) {
        throw new HttpError('Ошибка записи файла', 500, 'INTERNAL_ERROR');
    }
}