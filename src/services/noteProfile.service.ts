import {EnvelopeProfile} from "../schema/envelopeProfileSchema.js";
import {HttpError} from "../errors/HttpError.js";
import {readProfiles, writeProfiles} from "../repository/notification/index.js";
import {randomUUID} from "node:crypto";


export const defaultEnvelopeProfile: EnvelopeProfile = {
    id: '2',
    name: "DL конверт",
    fontSize: 9,
    width: 147,
    height: 105,
    lineHeight: 4,
    isRemoveLastWord: true,
    using: true,
    paddingTop: 48,
    paddingLeft: 36,
}

export async function saveProfile(profile: EnvelopeProfile): Promise<void> {

    const profiles = await readProfiles();
    const newProfile = {
        ...profile,
        id: randomUUID(), // ← добавили UID
    };
    profiles.push(newProfile);
    try {
        await writeProfiles(profiles);
    } catch (err) {
        throw new HttpError('Ошибка записи файла', 500, 'INTERNAL_ERROR');
    }
}

export async function getAllProfiles(): Promise<EnvelopeProfile[]> {
    try {
        return await readProfiles();

    } catch (err: any) {
        if (err.code === 'ENOENT') return [];
        throw err instanceof HttpError
            ? err
            : new HttpError('Ошибка чтения файла профилей', 500, 'INTERNAL_ERROR');
    }
}

export async function getUsingProfile(): Promise<EnvelopeProfile | null> {
    const profiles = await readProfiles()
    return profiles.find(p => p.using) ?? null;
}

export async function updateProfile(data:EnvelopeProfile[]): Promise<EnvelopeProfile[]> {
    await writeProfiles(data)
    try{
        return await readProfiles()

    }catch(error){
        throw new HttpError('Ошибка записи файла', 500, 'INTERNAL_ERROR');
    }
}





