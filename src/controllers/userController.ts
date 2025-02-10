/* eslint-disable max-len */
import { Request, Response } from 'express';
import { UserRequestRegisterBody } from '../core/interfaces/interfaces';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../dataLayer/dao/userDao';
import { User } from '../dataLayer/entities/User';
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

    // Retourner la réponse
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: "Erreur d'inscription :", error: handleError(error) });
  }
};

/**
 * Retrieves a user by their ID.
 * @param req - The request object containing the user ID.
 * @param res - The response object to send the user data or error message.
 * @returns A JSON response with the user data or an error message.
 */
export const getUserController = async (req: Request<{ userId: string }>, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await getUser(userId);
    const userObject = user as Partial<User>;
    delete userObject.password;
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    return res.status(200).json(userObject);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Erreur lors de la récupération de l\'utilisateur :', error: handleError(error) });
  }
};

/**
 * Retrieves all users.
 *
 * @param req - The request object.
 * @param res - The response object.
 * @returns A JSON response containing the users.
 */
export const getUsersController = async (req: Request, res: Response) => {
  try {
    const users = await getUsers();
    const userObjects = users.map((user) => {
      const userObject = user as Partial<User>;
      delete userObject.password;
      return userObject;
    });

    return res.status(200).json(userObjects);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Erreur lors de la récupération des utilisateurs :', error: handleError(error) });
  }
};

/**
 * Updates a user.
 *
 * @param req - The request object.
 * @param res - The response object.
 */
export const updateUserController = async (req: Request<{ userId: string }>, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await updateUser(userId, req.body as Partial<User>);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur', error: handleError(error) });
  }
};

/**
 * Deletes a user from the database.
 *
 * @param req - The request object.
 * @param res - The response object.
 */
export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    await deleteUser(userId);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error: handleError(error) });
  }
};
