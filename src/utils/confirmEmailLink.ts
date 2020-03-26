import { v4 } from 'uuid';
//import * as Redis from 'ioredis';
// const redis = new Redis();

export const confirmEmailLink = async (userId: number) => {
  const id = v4();

  // await redis.set(id, userId, 'ex', 60 * 60 * 60);

  return `${process.env.FRONTEND_HOST}/#/authentication/login?userId=${userId}`;
};