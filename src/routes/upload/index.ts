import { Router } from 'express';
import multer from 'multer';
import { uploadRoute } from '../../controller/uploadController';
import {validateExcelFile} from "../../middleware/validateFile.middleware";

const router = Router();

// Настройка multer прямо здесь или импортируй из отдельного файла
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});

router.post('/upload', upload.single('file'),validateExcelFile, uploadRoute);

export default router;
