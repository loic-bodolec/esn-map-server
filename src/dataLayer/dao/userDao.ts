/* eslint-disable max-len */
import bcrypt from 'bcryptjs';
import Exception from '../../core/exceptions/Exception';
import HttpException from '../../core/exceptions/HttpException';
import NotFoundException from '../../core/exceptions/NotFoundException';
import { removePassword } from '../../utils/removePassword';
import { validatePassword } from '../../utils/validatePassword';
import { User } from '../entities/User';
import { userRepository } from '../repositories/userRepository';

// Créer un nouvel utilisateur
export const createUser = async (username: string, firstname: string, lastname: string, email: string, job: string, password: string, role: string) => {
  // Vérifier si l'utilisateur existe déjà
  const existingUser = await userRepository().findOne({ where: { username } });
  if (existingUser) {
    throw new HttpException("Un utilisateur avec ce nom d'utilisateur existe déjà.", 409);
  }

  // Validation du mot de passe
  validatePassword(password);

  // Hachage du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Créer un nouvel utilisateur avec le mot de passe haché
  const newUser = userRepository().create({ username, firstname, lastname, email, job, password: hashedPassword, role });
  await userRepository().save(newUser);

  // Suprression du mot de passe avant de le retourner
  return removePassword(newUser);
};

// Créer un utilisateur administrateur par défaut
export const createDefaultAdminUser = async () => {
  const adminRole = 'admin';
  const adminUser = await userRepository().findOne({ where: { role: adminRole } });

  if (!adminUser) {
    const username = process.env.DEFAULT_ADMIN_USERNAME;
    const firstname = process.env.DEFAULT_ADMIN_FIRSTNAME;
    const lastname = process.env.DEFAULT_ADMIN_LASTNAME;
    const email = process.env.DEFAULT_ADMIN_EMAIL;
    const job = process.env.DEFAULT_ADMIN_JOB;
    const password = process.env.DEFAULT_ADMIN_PASSWORD;
    const role = adminRole;

    if (username && firstname && lastname && email && job && password && role) {
      await createUser(username, firstname, lastname, email, job, password, role);
    } else {
      throw new Exception('Une ou plusieurs variables d\'environnement ne sont pas définies.');
    }
  }
};

// Obtenir un utilisateur spécifique
export const getUser = async (userId: string) => userRepository().findOne({ where: { id: parseInt(userId, 10) } });

// Obtenir tous les utilisateurs
export const getUsers = async () => userRepository().find();

export const updateUser = async (userId: string, updatedData: Partial<User>) => {
  const user = await userRepository().findOne({ where: { id: parseInt(userId, 10) } });

  if (!user) {
    throw new NotFoundException('Utilisateur');
  }

  if (updatedData.password) {
    // Validation du mot de passe
    validatePassword(updatedData.password);

    const hashedPassword = await bcrypt.hash(updatedData.password, 10);
    updatedData.password = hashedPassword;
    user.password = updatedData.password;
  }

  // Mise à jour des champs de l'utilisateur
  if (updatedData.username) user.username = updatedData.username;
  if (updatedData.firstname) user.firstname = updatedData.firstname;
  if (updatedData.lastname) user.lastname = updatedData.lastname;
  if (updatedData.job) user.job = updatedData.job;
  if (updatedData.email) user.email = updatedData.email;
  if (updatedData.role) user.role = updatedData.role;

  return userRepository().save(user);
};

// Supprimer un utilisateur spécifique
export const deleteUser = async (userId: string) => {
  const user = await userRepository().findOne({ where: { id: parseInt(userId, 10) } });

  if (!user) {
    throw new NotFoundException('Utilisateur');
  }

  return userRepository().delete({ id: parseInt(userId, 10) });
};
