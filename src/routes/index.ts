import { Router } from 'express';
import uploadRoutes from './upload.route.js';
import envProfileRoute from "./envPofile.route.js";
import noteProfileRoute from "./notePofile.route.js";

const router = Router();

router.use('/api', uploadRoutes); // /api/upload
router.use('/api', envProfileRoute); // /api/upload
router.use('/api', noteProfileRoute); // /api/upload

export default router;