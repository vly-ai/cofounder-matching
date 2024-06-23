import { signIn, signOut, useSession } from 'next-auth/react';

export const signInUser = async (email: string, password: string): Promise<void> => {
  await signIn('credentials', { email, password, redirect: false });
};

export const signOutUser = async (): Promise<void> => {
  await signOut({ redirect: false });
};

export const useUserSession = () => {
  return useSession();
};
