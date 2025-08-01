import {NextFunction, Request, Response} from 'express';
import {getAllProfiles, saveProfile} from "../services/envProfile.service";
import {validate} from "../services/validator.service";
import {EnvelopeProfile, envelopeProfileSchema} from "../schema/envelopeProfileSchema";


export const createProfile = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const profile = validate<EnvelopeProfile>(req.body, envelopeProfileSchema);
        await saveProfile(profile);
        res.status(201).json({ message: 'Профиль добавлен' });
    } catch (error) {
        next(error);
    }
};


export const getAllProfile = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const profiles = await getAllProfiles();
        res.json(profiles);
    } catch (error) {
        next(error);
    }
}