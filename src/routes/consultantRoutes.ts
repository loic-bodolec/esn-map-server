// TODO update Swagger documentation
/* eslint-disable max-len */
import express, { Request, Response } from 'express';
import { createConsultantController, deleteConsultantController, getConsultantDetailsController, getConsultantsController, updateConsultantController } from '../controllers/consultantController';
import { isAdmin } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * /consultants/consultant:
 *   post:
 *     summary: Crée un nouveau consultant
 *     tags: [Consultants]
 *     description: Crée un nouveau consultant. Nécessite que l'utilisateur soit un administrateur.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               technoIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *               clientId:
 *                 type: integer
 *               workId:
 *                 type: integer
 *             example:
 *               firstname: "John"
 *               lastname: "Doe"
 *               technoIds: [1,3]
 *               clientId: 1
 *               workId: 1
 *     responses:
 *       200:
 *         description: Le consultant a été créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Consultant'
 */
router.post('/consultant', isAdmin, (req: Request, res: Response) => {
  createConsultantController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

/**
 * @swagger
 * /consultants:
 *   get:
 *     summary: Récupère la liste de tous les consultants
 *     tags: [Consultants]
 *     description: Récupère une liste de tous les consultants.
 *     responses:
 *       200:
 *         description: La liste des consultants a été récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   firstname:
 *                     type: string
 *                   lastname:
 *                     type: string
 *                   technos:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         name:
 *                           type: string
 *                   work:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *       500:
 *         description: Erreur de serveur
 */
router.get('', (req: Request, res: Response) => {
  getConsultantsController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

/**
 * @swagger
 * /consultants/consultant/{consultantId}:
 *   get:
 *     summary: Récupère les détails d'un consultant
 *     tags: [Consultants]
 *     description: Récupère les détails d'un consultant par son ID.
 *     parameters:
 *       - in: path
 *         name: consultantId
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID du consultant
 *     responses:
 *       200:
 *         description: Les détails du consultant ont été récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Consultant'
 *       404:
 *         description: Consultant non trouvé
 *       500:
 *         description: Erreur de serveur
 */
router.get('/consultant/:consultantId', (req: Request<{ consultantId: string }>, res: Response) => {
  getConsultantDetailsController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

/**
/**
 * @swagger
 * /consultants/consultant/{consultantId}:
 *   put:
 *     summary: Met à jour un consultant
 *     tags: [Consultants]
 *     description: Met à jour un consultant par son ID. Nécessite que l'utilisateur soit un administrateur.
 *     parameters:
 *       - in: path
 *         name: consultantId
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID du consultant
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               workId:
 *                 type: integer
 *               technoIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *               clientId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Le consultant a été mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Consultant'
 */
router.put('/consultant/:consultantId', isAdmin, (req: Request<{ consultantId: string }>, res: Response) => {
  updateConsultantController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

/**
 * @swagger
 * /consultants/consultant/{consultantId}:
 *   delete:
 *     summary: Supprime un consultant
 *     tags: [Consultants]
 *     description: Supprime un consultant par son ID. Nécessite que l'utilisateur soit un administrateur.
 *     parameters:
 *       - in: path
 *         name: consultantId
 *         schema:
 *           type: string
 *         required: true
 *         description: L'ID du consultant
 *     responses:
 *       200:
 *         description: Le consultant a été supprimé avec succès
 */
router.delete('/consultant/:consultantId', isAdmin, (req: Request<{ consultantId: string }>, res: Response) => {
  deleteConsultantController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

export default router;
