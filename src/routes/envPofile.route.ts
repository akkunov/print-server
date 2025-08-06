import { Router } from 'express';
import {createProfile, getAllProfile, updateProfile} from "../controller/envelopeProfile.controller";

const router = Router();

const PATH = '/envelopeProfile'

router.post(PATH, createProfile);
router.patch(PATH, updateProfile);
router.get(PATH, getAllProfile);

export default router;
