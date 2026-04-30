import path from "path";
import {__dirname} from "../utils/index.js";

export const ENV_FILE_PATH = path.resolve(
    __dirname,
    '../data/envelopeProfiles.json'
);

export const NOTE_FILE_PATH = path.resolve(
    __dirname,
    '../data/notificationProfile.json'
);