import {NextFunction, Request, Response} from 'express';

import {validate} from "../services/validator.service.js";
import {EnvelopeProfile, envelopeProfileSchema} from "../schema/envelopeProfileSchema.js";
import {getAllProfiles, saveProfile, updateProfile,} from "../services/noteProfile.service.js";


export const createProfile = async (req: Request, res: Response, next:NextFunction) => {
    try {
        console.log(req.body);
        const profile = validate<EnvelopeProfile>(req.body, envelopeProfileSchema);
        await saveProfile(profile);
        res.status(201).json({ message: 'Профиль добавлен' });
    } catch (error) {
        next(error);
    }
};

export const updateProfiles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profiles: EnvelopeProfile[] = req.body;

        const data = await updateProfile(profiles);

        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};

export const getAllProfile = async (req: Request, res: Response, next:NextFunction) => {
    console.log('note')
    try {
        const profiles = await getAllProfiles();
        res.json(profiles);
    } catch (error) {
        next(error);
    }
}