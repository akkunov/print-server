import {EnvelopeProfile} from "../schema/envelopeProfileSchema";
import {promises as fs} from "fs";
import {__dirname} from "../utils";
import path from "path";

const  __DIRNAME = __dirname;
const filePath = path.resolve(__DIRNAME, '../data/notificationProfile.json');

export const defaultEnvelopeProfile: EnvelopeProfile = {
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


export async function getUsingProfile(): Promise<EnvelopeProfile | null> {
    const file = await fs.readFile(filePath, 'utf-8');
    const profiles: EnvelopeProfile[] | [] = JSON.parse(file);
    const profile = profiles.find(p => p.using === true);
    if (!profile) return null;
    return profile
}