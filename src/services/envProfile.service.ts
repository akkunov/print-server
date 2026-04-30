import {HttpError} from "../errors/HttpError.js";
import {EnvelopeProfile} from "../schema/envelopeProfileSchema.js";
import {writeProfiles,readProfiles} from "../repository/envelope/index.js";
import {ENV_FILE_PATH} from "../configs/paths.js";
import {randomUUID} from "node:crypto";


export const defaultEnvelopeProfile: EnvelopeProfile = {
    id:'1',
    name:'DL конверт',
    fontSize: 8,
    width:220,
    height:110,
    isRemoveLastWord: true,
    using:false,
    lineHeight: 4,
    paddingTop:59,
    paddingLeft:150,
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
    console.log(ENV_FILE_PATH)
    try {
        const data = await readProfiles();
        console.log(data)
        return data

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

export async function updateEnvProfile(data:EnvelopeProfile[]): Promise<EnvelopeProfile[]> {
    await writeProfiles(data)
    try{
        return await readProfiles()

    }catch(error){
        throw new HttpError('Ошибка записи файла', 500, 'INTERNAL_ERROR');
    }
}




