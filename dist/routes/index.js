import { Router } from 'express';
import uploadRoutes from './upload.route.js';
import envProfileRoute from "./envPofile.route.js";
const router = Router();
router.use('/api', uploadRoutes); // /api/upload
router.use('/api', envProfileRoute); // /api/upload
export default router;
