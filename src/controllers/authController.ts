/* eslint-disable max-len */
import { Request, Response } from 'express';
import logger from '../config/logger/logger';
import { UserRequestLoginBody } from '../core/interfaces/interfaces';
import { loginUser } from '../dataLayer/dao/authDao';
import { handleError } from '../utils/handleError';

/**
 * Handles the login request and authenticates the user.
 *
 * @param req - The request object containing the username and password in the body.
 * @param res - The response object used to send the authentication result.
 * @returns A JSON response with the authentication result.
 */
export const loginController = async (req: Request<object, object, UserRequestLoginBody>, res: Response) => {
  const { username, password } = req.body;

  try {
    const { user, token } = await loginUser(username, password);

    logger.info(`User ${username} logged in successfully`);
    return res.status(200).json({ message: 'Authentification réussie', username: user.username, role: user.role, token });
  } catch (error) {
    logger.error(`Login error for user ${username}: ${error}`);
    return res.status(500).json({ message: 'Erreur de connexion :', error: handleError(error) });
  }
};