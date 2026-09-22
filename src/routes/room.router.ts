import { Router } from 'express';
import * as RoomController from '../controllers/room.controller.ts';
import validate from '../middlewares/validate.middleware.ts';
import { createRoomSchema, updateRoomSchema } from '../validators/room.validator.ts';

const router = Router();

/**
 * @swagger
 * /rooms:
 *   get:
 *     summary: Récupérer toutes les salles
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: Liste des salles
 */
router.get('/', RoomController.getAll);

/**
 * @swagger
 * /rooms/{id}:
 *   get:
 *     summary: Récupérer une salle par ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: La salle
 *       404:
 *         description: Salle non trouvée
 */
router.get('/:id', RoomController.getById);

/**
 * @swagger
 * /rooms:
 *   post:
 *     summary: Créer une salle
 *     tags: [Rooms]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               capacity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Salle créée
 */
router.post('/', validate(createRoomSchema), RoomController.create);

/**
 * @swagger
 * /rooms/{id}:
 *   put:
 *     summary: Mettre à jour une salle (complet)
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Salle mise à jour
 *       404:
 *         description: Salle non trouvée
 */
router.put('/:id', validate(updateRoomSchema), RoomController.update);

/**
 * @swagger
 * /rooms/{id}:
 *   patch:
 *     summary: Mettre à jour une salle (partiel)
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Salle mise à jour
 *       404:
 *         description: Salle non trouvée
 */
router.patch('/:id', RoomController.patch);

/**
 * @swagger
 * /rooms/{id}:
 *   delete:
 *     summary: Supprimer une salle
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Salle supprimée
 */
router.delete('/:id', RoomController.remove);

export default router;