export const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid credentials',
  USER_NOT_FOUND: 'User not found',
  USER_ALREADY_EXISTS: 'User already exists',
  USERNAME_TAKEN: 'Username already taken',
  CREATE_USER: 'Error creating user',
};

export const SALT_ROUNDS = 13;

export const TWO_HOURS_FROM_NOW_DATE = new Date(
  Date.now() + 2 * 60 * 60 * 1000,
);
