/* eslint-disable max-len */
import express, { Request, Response } from 'express';
import { createTechnoController, deleteTechnoController, getTechnoDetailsController, getTechnosController, updateTechnoController } from '../controllers/technoController';
import { isAdmin } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * /technos/techno:
 *   post:
 *     summary: Crée une nouvelle techno
 *     tags: [Technos]
 *     description: Crée une nouvelle techno. Nécessite que l'utilisateur soit un administrateur.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               technoName:
 *                 type: string
 *     responses:
 *       200:
 *         description: La techno a été créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Techno'
 */
router.post('/techno', isAdmin, (req: Request, res: Response) => {
  createTechnoController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

/**
 * @swagger
 * /technos:
 *   get:
 *     summary: Récupère la liste de toutes les technos
 *     tags: [Technos]
 *     description: Récupère une liste de toutes les technos.
 *     responses:
 *       200:
 *         description: La liste des technos a été récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Techno'
 */
router.get('', (req: Request, res: Response) => {
  getTechnosController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

/**
 * @swagger
 * /technos/techno/{technoId}:
 *   get:
 *     summary: Récupère les détails d'une techno
 *     tags: [Technos]
 *     description: Récupère les détails d'une techno par son ID.
 *     parameters:
 *       - in: path
 *         name: technoId
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID de la techno
 *     responses:
 *       200:
 *         description: Les détails de la techno ont été récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Techno'
 */
router.get('/techno/:technoId', (req: Request<{ technoId: string }>, res: Response) => {
  getTechnoDetailsController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

/**
 * @swagger
 * /technos/techno/{technoId}:
 *   put:
 *     summary: Met à jour une techno
 *     tags: [Technos]
 *     description: Met à jour une techno par son ID. Nécessite que l'utilisateur soit un administrateur.
 *     parameters:
 *       - in: path
 *         name: technoId
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID de la techno
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               technoName:
 *                 type: string
 *     responses:
 *       200:
 *         description: La techno a été mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Techno'
 */
router.put('/techno/:technoId', isAdmin, (req: Request<{ technoId: string }>, res: Response) => {
  updateTechnoController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

/**
 * @swagger
 * /technos/techno/{technoId}:
 *   delete:
 *     summary: Supprime une techno
 *     tags: [Technos]
 *     description: Supprime une techno par son ID. Nécessite que l'utilisateur soit un administrateur.
 *     parameters:
 *       - in: path
 *         name: technoId
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID de la techno
 *     responses:
 *       200:
 *         description: La techno a été supprimée avec succès
 */
router.delete('/techno/:technoId', isAdmin, (req: Request<{ technoId: string }>, res: Response) => {
  deleteTechnoController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

export default router;
