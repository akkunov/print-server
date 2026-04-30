import { Router } from 'express';
import {createProfile, getAllProfile, updateProfiles} from "../controller/envelopeProfile.controller.js";

const router = Router();

const PATH = '/envelope-profiles'

/**
 * @openapi
 * /envelope-profiles:
 *   post:
 *     summary: Создать профиль конверта
 *     tags:
 *       - EnvelopeProfile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EnvelopeProfile'
 *     responses:
 *       201:
 *         description: Профиль добавлен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Профиль добавлен
 *       400:
 *         description: Профиль уже существует или неверные данные
 *       500:
 *         description: Ошибка сервера
 */

router.post(PATH, createProfile);

/**
 * @openapi
 * /envelope-profiles:
 *   patch:
 *     summary: Обновить все профили
 *     tags:
 *       - EnvelopeProfile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/EnvelopeProfile'
 *     responses:
 *       200:
 *         description: Обновлённый список
 */


router.patch(PATH, updateProfiles);

/**
 * @openapi
 * /envelope-profiles:
 *   get:
 *     summary: Получить все профили
 *     tags:
 *       - EnvelopeProfile
 *     responses:
 *       200:
 *         description: Список профилей
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EnvelopeProfile'
 */
router.get(PATH, getAllProfile);

export default router;
