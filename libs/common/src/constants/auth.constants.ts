import ms from 'ms';

export const SALT_ROUNDS = 13;

export const TWO_HOURS_FROM_NOW_DATE = new Date(
  Date.now() + 2 * 60 * 60 * 1000,
);

export const THREE_DAYS = ms('3d');

export const JWT_EXPIRATION_TIME = '2h';
