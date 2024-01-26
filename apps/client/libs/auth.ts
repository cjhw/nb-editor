import { COOKIE_NAME, COOKIE_PASSWORD } from '@/constants/api';
import type { User } from 'farm-prisma';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

export const getSession = () =>
  getIronSession<Partial<Pick<User, 'id' | 'username'>>>(cookies(), {
    password: COOKIE_PASSWORD,
    cookieName: COOKIE_NAME
  });

export const checkIsLogin = async () => {
  const session = await getSession();
  return !!session.id;
};

export const getCurrentUserName = async () => {
  const session = await getSession();
  return session.username;
};
