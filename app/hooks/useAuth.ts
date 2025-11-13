import { useCallback } from 'react';
import { useMMKVString } from 'react-native-mmkv';
import { APIClient, storage } from '../core/APIClient';
import { IAuthSession, ILoginForm, ILoginResponse } from '../models/auth';
import { useAppDispatch } from '../store';

export const useAuth = () => {
  const [session, setSession] = useMMKVString('session');
  const dispatch = useAppDispatch();

  const login = useCallback(
    async (credentials: ILoginForm): Promise<boolean> => {
      try {
        const response = await APIClient.post<ILoginResponse>('/api/login', {
          email: credentials.email,
          password: credentials.password,
        });

        if (response.data.success && response.data.data) {
          const authSession: IAuthSession = {
            user: response.data.data.user,
            token: response.data.data.token,
          };
          setSession(JSON.stringify(authSession));
          return true;
        } else {
          return false;
        }
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          'An error occurred during login';
        return false;
      }
    },
    [dispatch],
  );

  const logout = useCallback(() => {
    setSession(undefined);
  }, []);

  return {
    session,
    login,
    logout,
  };
};
