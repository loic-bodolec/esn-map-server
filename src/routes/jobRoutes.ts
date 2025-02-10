/* eslint-disable max-len */
import express, { Request, Response } from 'express';
import { createJobController, deleteJobController, getJobDetailsController, getJobsController, updateJobController } from '../controllers/jobController';
import { isAdmin } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * /jobs/job:
 *   post:
 *     summary: Crée un nouveau job
 *     tags: [Jobs]
 *     description: Crée un nouveau job. Nécessite que l'utilisateur soit un administrateur.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jobName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Le job a été créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 */
router.post('/job', isAdmin, (req: Request, res: Response) => {
  createJobController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

/**
 * @swagger
 * /jobs:
 *   get:
 *     summary: Récupère la liste de tous les jobs
 *     tags: [Jobs]
 *     description: Récupère une liste de tous les jobs.
 *     responses:
 *       200:
 *         description: La liste des jobs a été récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 */
router.get('', (req: Request, res: Response) => {
  getJobsController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

/**
 * @swagger
 * /jobs/job/{jobId}:
 *   get:
 *     summary: Récupère les détails d'un job
 *     tags: [Jobs]
 *     description: Récupère les détails d'un job par son ID.
 *     parameters:
 *       - in: path
 *         name: jobId
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID du job
 *     responses:
 *       200:
 *         description: Les détails du job ont été récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 */
router.get('/job/:jobId', (req: Request<{ jobId: string }>, res: Response) => {
  getJobDetailsController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

/**
 * @swagger
 * /jobs/job/{jobId}:
 *   put:
 *     summary: Met à jour un job
 *     tags: [Jobs]
 *     description: Met à jour un job par son ID. Nécessite que l'utilisateur soit un administrateur.
 *     parameters:
 *       - in: path
 *         name: jobId
 *         schema:
 *         type: string
 *         required: true
 *         description: L'ID du job
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jobName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Le job a été mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 */
router.put('/job/:jobId', isAdmin, (req: Request<{ jobId: string }>, res: Response) => {
  updateJobController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

/**
 * @swagger
 * /jobs/job/{jobId}:
 *   delete:
 *     summary: Supprime un job
 *     tags: [Jobs]
 *     description: Supprime un job par son ID. Nécessite que l'utilisateur soit un administrateur.
 *     parameters:
 *       - in: path
 *         name: jobId
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID du job
 *     responses:
 *       200:
 *         description: Le job a été supprimé avec succès
 */
router.delete('/job/:jobId', isAdmin, (req: Request<{ jobId: string }>, res: Response) => {
  deleteJobController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

export default router;
