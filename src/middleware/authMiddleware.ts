/* eslint-disable max-len */
import * as dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import ActionException from '../core/exceptions/ActionException';
import Exception from '../core/exceptions/Exception';

dotenv.config();

/**
 * Middleware function to check if a user is logged in.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next function to call.
 */
export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  const token: unknown = req.headers.authorization;

  if (!token) {
    throw new Error('Vous devez être connecté pour accéder à cette ressource');
  }

  try {
    const secretKey = process.env.JWT_SECRET_KEY;
    const decodedToken = jwt.verify(token as string, secretKey as string) as unknown;
    const { userId, username, role } = decodedToken as { userId: string, username: string, role: string };
    (req as Request & { user: { userId: string, username: string, role: string } }).user = {
      userId,
      username,
      role,
    };
    next();
  } catch (error) {
    throw new Exception(`Erreur lors de la vérification du token : ${error as string}`);
  }
};

/**
 * Middleware function to check if the user is an admin.
 *
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function.
 */
// export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
//   const { user } = (req as Request & { user: { userId: string, username: string, role: string } });

//   if (user.role !== 'admin') {
//     res.status(403).json({ message: 'Accès refusé, vous devez être administrateur pour accéder à cette ressource.' });
//   }

//   next();
// };

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const { user } = (req as Request & { user: { userId: string, username: string, role: string } });

  if (user.role !== 'admin') {
    throw new ActionException();
  }

  next();
};

// TODO à finaliser
// /**
//  * Middleware function to check if the user making the request is the logged in user.
//  *
//  * @param req - The Express request object.
//  * @param res - The Express response object.
//  * @param next - The next middleware function.
//  */
// export const isUser = (req: Request, res: Response, next: NextFunction) => {
//   const { user } = (req as Request & { user: { userId: string, username: string, role: string } });
//   const { userId } = req.params;

//   if (user.userId !== userId) {
//     res.status(403).json({ message: 'Accès refusé, vous ne pouvez accéder qu\'à vos propres ressources.' });
//     return;
//   }

//   next();
// };
