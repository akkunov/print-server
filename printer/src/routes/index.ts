import { Router } from 'express';
import {upload, uploadRoute } from '../controller/uploadController';

const router = Router();

router.post('/upload', upload.single('file'),uploadRoute);

export default router;