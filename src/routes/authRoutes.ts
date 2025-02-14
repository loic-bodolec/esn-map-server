/* eslint-disable max-len */
import express from 'express';
import logger from '../config/logger/logger';
import { loginController } from '../controllers/authController';

/**
 * Express router for handling authentication routes.
 */
const router = express.Router();

/**
 * Route for user login.
 * @param req - The request object.
 * @param res - The response object.
 */
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Se connecter à l'application
 *     tags: [Authentification]
 *     description: Se connecter à l'application en utilisant un nom d'utilisateur et un mot de passe.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authentification réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 username:
 *                   type: string
 *                 role:
 *                   type: string
 *                 token:
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
router.post('/login', (req, res) => {
  loginController(req, res)
    .catch((error: unknown) => {
      logger.error(`Login error for user ${req.body.username}: ${error}`);
      res.status(500).send({ message: 'Une erreur est survenue', error });
    });
});

export default router;