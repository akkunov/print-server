import { Router } from 'express';
import uploadRoutes from './upload';

const router = Router();

router.use('/api', uploadRoutes); // /api/upload

export default router;