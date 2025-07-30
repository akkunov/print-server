import { Router } from 'express';
import uploadRoutes from './upload/index.js';
const router = Router();
router.use('/api', uploadRoutes); // /api/upload
export default router;
