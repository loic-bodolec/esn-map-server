/* eslint-disable max-len */
import express, { Request, Response } from 'express';
import { createWorkController, deleteWorkController, getWorkDetailsController, getWorksController, updateWorkController } from '../controllers/workController';
import { isAdmin } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * /works/work:
 *   post:
 *     summary: Crée un nouveau poste
 *     tags: [Postes]
 *     description: Crée un nouveau poste. Nécessite que l'utilisateur soit un administrateur.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Le poste a été créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Work'
 */
router.post('/work', isAdmin, (req: Request, res: Response) => {
  createWorkController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

/**
 * @swagger
 * /works:
 *   get:
 *     summary: Récupère la liste de tous les postes
 *     tags: [Postes]
 *     description: Récupère une liste de tous les postes.
 *     responses:
 *       200:
 *         description: La liste des postes a été récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Work'
 */
router.get('', (req: Request, res: Response) => {
  getWorksController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

/**
 * @swagger
 * /works/work/{workId}:
 *   get:
 *     summary: Récupère les détails d'un poste spécifique
 *     tags: [Postes]
 *     description: Récupère les détails d'un poste par son ID.
 *     parameters:
 *       - in: path
 *         name: workId
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID du poste
 *     responses:
 *       200:
 *         description: Les détails du poste ont été récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Work'
 */
router.get('/work/:workId', (req: Request<{ workId: string }>, res: Response) => {
  getWorkDetailsController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

/**
 * @swagger
 * /works/work/{workId}:
 *   put:
 *     summary: Met à jour un poste
 *     tags: [Postes]
 *     description: Met à jour un poste par son ID. Nécessite que l'utilisateur soit un administrateur.
 *     parameters:
 *       - in: path
 *         name: workId
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID du poste
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Le poste a été mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Work'
 */
router.put('/work/:workId', isAdmin, (req: Request<{ workId: string }>, res: Response) => {
  updateWorkController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

/**
 * @swagger
 * /works/work/{workId}:
 *   delete:
 *     summary: Supprime un poste
 *     tags: [Postes]
 *     description: Supprime un poste par son ID. Nécessite que l'utilisateur soit un administrateur.
 *     parameters:
 *       - in: path
 *         name: workId
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID du poste
 *     responses:
 *       200:
 *         description: Le poste a été supprimé avec succès
 */
router.delete('/work/:workId', isAdmin, (req: Request<{ workId: string }>, res: Response) => {
  deleteWorkController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

export default router;
