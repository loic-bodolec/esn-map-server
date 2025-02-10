/* eslint-disable max-len */
import express, { Request, Response } from 'express';
import { createClientController, deleteClientController, getClientDetailsController, getClientsController, updateClientController } from '../controllers/clientController';
import { isAdmin } from '../middleware/authMiddleware';

/**
 * Express router for handling course-related routes.
 */
const router = express.Router();

/**
 * @swagger
 * /clients/client:
 *   post:
 *     summary: Crée un nouveau client
 *     tags: [Clients]
 *     description: Crée un nouveau client. Nécessite que l'utilisateur soit un administrateur.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               activity:
 *                 type: string
 *               expertiseIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *               jobIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *               address:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               logo:
 *                 type: string
 *                 nullable: true
 *               link:
 *                 type: string
 *                 nullable: true
 *             example:
 *               name: "Client Name"
 *               activity: "Client Activity"
 *               expertiseIds: [1,2]
 *               jobIds: [1,2]
 *               address: "123 Street, City"
 *               latitude: 45.12345
 *               longitude: -75.12345
 *               logo: "https://example.com/logo.png"
 *     responses:
 *       200:
 *         description: Le client a été créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 */
router.post('/client', isAdmin, (req: Request, res: Response) => {
  createClientController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

/**
 * @swagger
 * /clients:
 *   get:
 *     summary: Récupère tous les clients
 *     tags: [Clients]
 *     description: Récupère une liste de tous les clients.
 *     responses:
 *       200:
 *         description: Une liste de clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Client'
 *       500:
 *         description: Erreur de serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('', (req: Request, res: Response) => {
  getClientsController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

/**
 * @swagger
 * /clients/client/{clientId}:
 *   get:
 *     summary: Récupère les détails d'un client
 *     tags: [Clients]
 *     description: Récupère les détails d'un client par son ID.
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Détails du client
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       500:
 *         description: Erreur de serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/client/:clientId', (req: Request<{ clientId: string }>, res: Response) => {
  getClientDetailsController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

/**
 * @swagger
 * /clients/client/{clientId}:
 *   put:
 *     summary: Met à jour un client
 *     tags: [Clients]
 *     description: Met à jour un client par son ID. Nécessite que l'utilisateur soit un administrateur.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du client à mettre à jour
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               activity:
 *                 type: string
 *               expertiseIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *               jobIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *               address:
 *                 type: string
 *               latitude:
 *                 type: number
 *               longitude:
 *                 type: number
 *               logo:
 *                 type: string
 *                 nullable: true
 *               link:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Le client a été mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 */
router.put('/client/:clientId', isAdmin, (req: Request<{ clientId: string }>, res: Response) => {
  updateClientController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

/**
 * @swagger
 * /clients/client/{clientId}:
 *   delete:
 *     summary: Supprime un client
 *     tags: [Clients]
 *     description: Supprime un client par son ID. Nécessite que l'utilisateur soit un administrateur.
 *     parameters:
 *       - in: path
 *         name: clientId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Client supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Erreur de serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete('/client/:clientId', isAdmin, (req: Request<{ clientId: string }>, res: Response) => {
  deleteClientController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

export default router;
