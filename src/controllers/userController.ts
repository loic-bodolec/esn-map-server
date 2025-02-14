/* eslint-disable max-len */
import { Request, Response } from 'express';
import logger from '../config/logger/logger';
import { UserRequestRegisterBody } from '../core/interfaces/interfaces';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../dataLayer/dao/userDao';
import { handleError } from '../utils/handleError';

/**
 * Controller function to handle user creation/registration.
 *
 * @param req - The request object containing user registration data.
 * @param res - The response object to send the registration result.
 * @returns A JSON response with the status and the created user data.
 */
export const createUserController = async (req: Request<object, object, UserRequestRegisterBody>, res: Response) => {
  const { username, firstname, lastname, email, job, password, role } = req.body;

  try {
    const newUser = await createUser(username, firstname, lastname, email, job, password, role);
    logger.info(`User created successfully: ${newUser.id}`);
    return res.status(201).json(newUser);
  } catch (error) {
    logger.error(`Error creating user: ${error}`);
    return res.status(500).json({ message: "Erreur d'inscription :", error: handleError(error) });
  }
};

export const getUsersController = async (_req: Request, res: Response) => {
  try {
    const users = await getUsers();
    logger.info(`Fetched ${users.length} users`);
    return res.status(200).json(users);
  } catch (error) {
    logger.error(`Error fetching users: ${error}`);
    return res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs :', error: handleError(error) });
  }
};

export const getUserController = async (req: Request<{ userId: string }>, res: Response) => {
  const { userId } = req.params;
  try {
    const user = await getUser(userId);
    if (!user) {
      logger.warn(`User not found: ${userId}`);
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    logger.info(`Fetched details for user: ${userId}`);
    return res.status(200).json(user);
  } catch (error) {
    logger.error(`Error fetching user details for ${userId}: ${error}`);
    return res.status(500).json({ message: 'Erreur lors de la récupération des détails de l\'utilisateur :', error: handleError(error) });
  }
};

export const updateUserController = async (req: Request<{ userId: string }>, res: Response) => {
  const { userId } = req.params;
  const { username, firstname, lastname, email, job, password, role } = req.body;

  try {
    const updatedUser = await updateUser(userId, { username, firstname, lastname, email, job, password, role });
    logger.info(`User updated successfully: ${userId}`);
    return res.status(200).json(updatedUser);
  } catch (error) {
    logger.error(`Error updating user ${userId}: ${error}`);
    return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur :', error: handleError(error) });
  }
};

export const deleteUserController = async (req: Request<{ userId: string }>, res: Response) => {
  const { userId } = req.params;
  try {
    await deleteUser(userId);
    logger.info(`User deleted successfully: ${userId}`);
    return res.status(204).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    logger.error(`Error deleting user ${userId}: ${error}`);
    return res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur :', error: handleError(error) });
  }
};