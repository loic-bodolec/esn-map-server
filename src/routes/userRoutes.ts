// TODO update Swagger documentation
/* eslint-disable max-len */
import express, { Request, Response } from 'express';
import {
  createUserController,
  deleteUserController,
  getUserController,
  getUsersController,
  updateUserController,
} from '../controllers/userController';
import { isAdmin } from '../middleware/authMiddleware';

/**
 * Express router for handling user routes.
 */
const router = express.Router();

/**
 * POST /create
 * Creates a new user .
 * Requires the user to be an admin.
 *
 * Route for user registration.
 * @param req - The request object.
 * @param res - The response object.
 */
/**
 * @swagger
 * /users/user:
 *   post:
 *     summary: Crée un nouvel utilisateur
 *     tags: [Utilisateurs]
 *     description: Crée un nouvel utilisateur. Nécessite que l'utilisateur soit un administrateur.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - firstname
 *               - lastname
 *               - email
 *               - job
 *               - password
 *               - role
 *             properties:
 *               username:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               job:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.post('/user', isAdmin, (req, res) => {
  createUserController(req, res)
    .catch((error: unknown) => {
      res.status(500).send({ message: 'Une erreur est survenue', error });
    });
});

/**
 * GET /users
 * Retrieves all users.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A Promise that resolves to the retrieved users or an error response.
 */
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupère tous les utilisateurs
 *     tags: [Utilisateurs]
 *     description: Récupère une liste de tous les utilisateurs. Nécessite que l'utilisateur soit un administrateur.
 *     responses:
 *       200:
 *         description: Une liste d'utilisateurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
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
  getUsersController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

/**
 * GET /user/:userId
 * Retrieves a user by their ID.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A Promise that resolves to the retrieved user or an error response.
 */
/**
 * @swagger
 * /users/user/{userId}:
 *   get:
 *     summary: Récupère les détails d'un utilisateur
 *     tags: [Utilisateurs]
 *     description: Récupère les détails d'un utilisateur par son ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A user object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
router.get('/user/:userId', (req: Request<{ userId: string }>, res: Response) => {
  getUserController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

/**
 * PUT /user/:userId
 * Updates a user by their ID.
 *  Requires the user to be an admin.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A Promise that resolves to a success message or an error response.
 */
/**
 * @swagger
 * /users/user/{userId}:
 *   put:
 *     summary: Met à jour un utilisateur
 *     tags: [Utilisateurs]
 *     description: Met à jour un utilisateur par son ID. Nécessite que l'utilisateur soit un administrateur.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               job:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: A success message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.put('/user/:userId', isAdmin, (req: Request<{ userId: string }>, res: Response) => {
  updateUserController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

/**
 * DELETE /user/:userId
 * Deletes a user by their ID.
 * Requires the user to be an admin.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A Promise that resolves to a success message or an error response.
 */
/**
 * @swagger
 * /users/user/{userId}:
 *   delete:
 *     summary: Supprime un utilisateur
 *     tags: [Utilisateurs]
 *     description: Supprime un utilisateur par son ID. Nécessite que l'utilisateur soit un administrateur.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: A success message
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.delete('/user/:userId', isAdmin, (req: Request<{ userId: string }>, res: Response) => {
  deleteUserController(req, res)
    .catch((error: unknown) => res.status(500).json({ message: 'Erreur de serveur', error }));
});

export default router;
