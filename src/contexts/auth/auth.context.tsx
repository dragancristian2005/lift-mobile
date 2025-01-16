import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import axios from 'axios';

const AuthContext = createContext<{
  jwt: string | null;
  signIn: (token: string) => void;
  signOut: () => void;
}>({
  jwt: null,
  signIn: () => {},
  signOut: () => {},
});

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  return {
    loggedIn: !!ctx.jwt,
    signIn: ctx.signIn,
    signOut: ctx.signOut,
  };
};

export const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [jwt, setJwt] = useState<string | null>(null);

  const signIn = useCallback((token: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    setJwt(token);
  }, []);

  const signOut = useCallback(() => {
    axios.defaults.headers.common.Authorization = '';
    setJwt(null);
  }, []);

  const value = useMemo(
    () => ({
      jwt,
      signIn,
      signOut,
    }),
    [jwt, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
