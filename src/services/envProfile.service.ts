import path from "path";
import { promises as fs } from 'fs';
import {__dirname} from "../utils/index.js";
import {HttpError} from "../errors/HttpError.js";
import {EnvelopeProfile} from "../schema/envelopeProfileSchema.js";



export const defaultEnvelopeProfile: EnvelopeProfile = {
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

const  __DIRNAME = __dirname;
const filePath = path.resolve(__DIRNAME, '../data/envelopeProfiles.json');

export async function saveProfile(profile: EnvelopeProfile): Promise<void> {
    let profiles: EnvelopeProfile[] = [];

    try {
        const file = await fs.readFile(filePath, 'utf-8');
        profiles = JSON.parse(file);
    } catch (err) {
        throw new HttpError('Ошибка чтения файла', 500, 'INTERNAL_ERROR');
    }
    const exists = profiles.some((p) => p.name === profile.name);
    if (exists) {
        throw new HttpError(`Профиль "${profile.name}" уже существует`, 400, 'BAD_REQUEST');
    }
    profiles.push(profile);

    try {
        await fs.writeFile(filePath, JSON.stringify(profiles, null, 2), 'utf-8');
    } catch (err) {
        throw new HttpError('Ошибка записи файла', 500, 'INTERNAL_ERROR');
    }
}

export async function getAllProfiles(): Promise<EnvelopeProfile[]> {
    try {
        const file = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(file);
    } catch (err: any) {
        if (err.code === 'ENOENT') return []; // Если файла нет — просто вернём пустой массив
        throw new HttpError('Ошибка чтения файла профилей', 500, 'INTERNAL_ERROR');
    }
}

export async function getProfileByName(name: string): Promise<EnvelopeProfile | null> {
    const file = await fs.readFile(filePath, 'utf-8');
    const profiles: EnvelopeProfile[] | [] = JSON.parse(file);
    const profile = profiles.find(p => p.name === name);
    if (!profile) return null;
    return profile
}

export async function getUsingProfile(): Promise<EnvelopeProfile | null> {
    const file = await fs.readFile(filePath, 'utf-8');
    const profiles: EnvelopeProfile[] | [] = JSON.parse(file);
    const profile = profiles.find(p => p.using === true);
    if (!profile) return null;
    return profile
}


export async function updateEnvProfile(data:EnvelopeProfile[]): Promise<EnvelopeProfile[]> {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
    try{
        const file  = await fs.readFile(filePath, 'utf-8');
        const data:EnvelopeProfile[] = JSON.parse(file);
        return data

    }catch(error){
        throw new HttpError('Ошибка записи файла', 500, 'INTERNAL_ERROR');
    }
}




