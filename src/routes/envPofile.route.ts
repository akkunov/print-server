import { Router } from 'express';
import {createProfile, getAllProfile} from "../controller/envelopeProfile.controller";

const router = Router();

const PATH = '/envelopeProfile'

router.post(PATH, createProfile);

router.get(PATH, getAllProfile);

export default router;
