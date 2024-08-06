import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  PropsWithChildren,
} from 'react';
import {fetcher} from '@/adapters';

type AuthContextType = {
  user: any;
  check: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: PropsWithChildren) => {
  const [user, setUser] = useState();

  useEffect(() => {
    // Check for the token when the app loads
    check();
  }, []);

  const check = () => {
    fetcher
      .get('/auth/resident')
      .then(res => {
        console.log('login status:\n> ', JSON.stringify(res.data));
        setUser(res.data.user);
      })
      .catch(err => {
        setUser(undefined);
        console.debug(
          'verify error:\n> ',
          JSON.stringify(err.response.data.error, undefined, 2),
        );
      });
  };

  return (
    <AuthContext.Provider value={{user, check}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
