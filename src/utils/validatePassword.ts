import PasswordValidator from 'password-validator';

/**
 * Validates a password based on certain criteria.
 * @param password - The password to be validated.
 * @throws Throws an error if the password does not meet the specified criteria.
 */
export const validatePassword = (password: string) => {
  const passwordSchema = new PasswordValidator();
  passwordSchema
    .is()
    .min(8) // Minimum length 8
    .max(30) // Maximum length 30
    .has()
    .uppercase(1) // Must have at least 1 uppercase letter
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .symbols(1) // Must have at least 1 symbol
    .has()
    .digits(2) // Must have at least 2 digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(['Password12', 'Password123']); // Blacklist these values

  if (!passwordSchema.validate(password)) {
    throw new Error('Ton mot de passe doit être entre 8 et 30 caractères (au moins 1 majuscule, au moins 2 chiffres, au moins 1 symbole et sans espace)!');
  }
};
