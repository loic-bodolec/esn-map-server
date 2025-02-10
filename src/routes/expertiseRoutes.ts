/* eslint-disable max-len */
import express, { Request, Response } from 'express';
import { createExpertiseController, deleteExpertiseController, getExpertiseDetailsController, getExpertisesController, updateExpertiseController } from '../controllers/expertiseController';
import { isAdmin } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * /expertises/expertise:
 *   post:
 *     summary: Crée une nouvelle expertise
 *     tags: [Expertises]
 *     description: Crée une nouvelle expertise. Nécessite que l'utilisateur soit un administrateur.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               expertiseName:
 *                 type: string
 *     responses:
 *       200:
 *         description: L'expertise a été créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expertise'
 */
router.post('/expertise', isAdmin, (req: Request, res: Response) => {
  createExpertiseController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

/**
 * @swagger
 * /expertises:
 *   get:
 *     summary: Récupère la liste de toutes les expertises
 *     tags: [Expertises]
 *     description: Récupère une liste de toutes les expertises.
 *     responses:
 *       200:
 *         description: La liste des expertises a été récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Expertise'
 */
router.get('', (req: Request, res: Response) => {
  getExpertisesController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

/**
 * @swagger
 * /expertises/expertise/{expertiseId}:
 *   get:
 *     summary: Récupère les détails d'une expertise
 *     tags: [Expertises]
 *     description: Récupère les détails d'une expertise par son ID.
 *     parameters:
 *       - in: path
 *         name: expertiseId
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID de l'expertise
 *     responses:
 *       200:
 *         description: Les détails de l'expertise ont été récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expertise'
 */
router.get('/expertise/:expertiseId', (req: Request<{ expertiseId: string }>, res: Response) => {
  getExpertiseDetailsController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

/**
 * @swagger
 * /expertises/expertise/{expertiseId}:
 *   put:
 *     summary: Met à jour une expertise
 *     tags: [Expertises]
 *     description: Met à jour une expertise par son ID. Nécessite que l'utilisateur soit un administrateur.
 *     parameters:
 *       - in: path
 *         name: expertiseId
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID de l'expertise
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               expertiseName:
 *                 type: string
 *     responses:
 *       200:
 *         description: L'expertise a été mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Expertise'
 */
router.put('/expertise/:expertiseId', isAdmin, (req: Request<{ expertiseId: string }>, res: Response) => {
  updateExpertiseController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

/**
 * @swagger
 * /expertises/expertise/{expertiseId}:
 *   delete:
 *     summary: Supprime une expertise
 *     tags: [Expertises]
 *     description: Supprime une expertise par son ID. Nécessite que l'utilisateur soit un administrateur.
 *     parameters:
 *       - in: path
 *         name: expertiseId
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID de l'expertise
 *     responses:
 *       200:
 *         description: L'expertise a été supprimée avec succès
 */
router.delete('/expertise/:expertiseId', isAdmin, (req: Request<{ expertiseId: string }>, res: Response) => {
  deleteExpertiseController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

export default router;
