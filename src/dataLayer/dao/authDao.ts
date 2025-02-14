import * as dotenv from 'dotenv';
import HttpException from '../../core/exceptions/HttpException';
import UserNotFoundException from '../../core/exceptions/UserNotFoundException';
import { generateToken } from '../../utils/token';
import { User } from '../entities/User';

dotenv.config();

export const loginUser = async (username: string, password: string) => {
  // Vérifier si l'utilisateur existe
  const user = await User.findOne({ where: { username } });
  if (!user) {
    throw new UserNotFoundException();
  }

  // Vérifier si le mot de passe est correct
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new HttpException('Mot de passe incorrect.', 401);
  }

  // Générer le token
  const token: string = generateToken(user);

  return { user, token };
};
