import {NextFunction, Request, Response} from 'express';
import {getAllProfiles, saveProfile, updateEnvProfile} from "../services/envProfile.service.js";
import {validate} from "../services/validator.service.js";
import {EnvelopeProfile, envelopeProfileSchema} from "../schema/envelopeProfileSchema.js";


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

export const updateProfile = async (req: Request, res: Response, next:NextFunction) => {
    try{
        const profile:EnvelopeProfile[] = req.body;
        const data = await updateEnvProfile(profile);
        console.log(data);
        return res.status(200).json(data);
    }catch(error){
        next(error);
    }
}


export const getAllProfile = async (req: Request, res: Response, next:NextFunction) => {
    try {
        const profiles = await getAllProfiles();
        res.json(profiles);
    } catch (error) {
        next(error);
    }
}