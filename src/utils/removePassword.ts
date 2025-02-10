import { User } from "../dataLayer/entities/User";

export const removePassword = (user: User) => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};