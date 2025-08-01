import { Router } from 'express';
import uploadRoutes from './upload.route';
import envProfileRoute from "./envPofile.route";

const router = Router();

router.use('/api', uploadRoutes); // /api/upload
router.use('/api', envProfileRoute); // /api/upload

export default router;