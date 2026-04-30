import { Router } from 'express';
import {createProfile, getAllProfile, updateProfiles} from "../controller/noteProfile.controller.js";

const router = Router();

const PATH = '/note-profiles'

/**
 * @openapi
 * /note-profiles:
 *   post:
 *     summary: Создать профиль уведомления
 *     tags:
 *       - NoteProfile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NoteProfile'
 *     responses:
 *       201:
 *         description: Профиль успешно создан
 *         content:
 *           application/json:
 *             example:
 *               message: Профиль добавлен
 *       400:
 *         description: Профиль уже существует
 *       500:
 *         description: Ошибка сервера
 */
router.post(PATH, createProfile);
/**
 * @openapi
 * /note-profiles:
 *   patch:
 *     summary: Обновить список профилей (полная замена)
 *     tags:
 *       - NoteProfile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/NoteProfile'
 *     responses:
 *       200:
 *         description: Профили обновлены
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EnvelopeProfile'
 *       500:
 *         description: Ошибка записи файла
 */

router.patch(PATH, updateProfiles);

/**
 * @openapi
 * /note-profiles:
 *   get:
 *     summary: Получить все профили
 *     tags:
 *       - NoteProfile
 *     responses:
 *       200:
 *         description: Список профилей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NoteProfile'
 */
router.get(PATH, getAllProfile);

export default router;
