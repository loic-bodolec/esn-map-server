import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { User } from '../core/interfaces/interfaces';

dotenv.config();

export const generateToken = (user: User): string => {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role,
    // Ajoutez ici d'autres propriétés de l'utilisateur si nécessaire
  };

  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    throw new Error('Missing JWT Secret Key');
  }

  const options = { expiresIn: '1h' }; // Le token expirera après 1 heure

  return jwt.sign(payload, secretKey, options);
};

export const verifyToken = (token: string): string | jwt.JwtPayload => {
  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    throw new Error('Missing JWT Secret Key');
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw new Error(`Error verifying token: ${error as string}`);
  }
};
