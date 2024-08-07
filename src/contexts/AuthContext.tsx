import {Auth} from '@/adapters/requests';
import {UserInfo} from '@/adapters/types';
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

type AuthContextType = {
  check: () => void;
  user?: UserInfo;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: PropsWithChildren) => {
  const [user, setUser] = useState<UserInfo>();

  useEffect(() => {
    // Check for the token when the app loads
    check();
  }, []);

  const check = () => {
    Auth.verifyResident()
      .then(res => {
        console.info('user info:\n> ', JSON.stringify(res.data));
        setUser(res.data.user_info);
      })
      .catch(err => {
        setUser(undefined);
        console.debug(
          'verify error:\n> ',
          JSON.stringify(err.response.data, undefined, 2),
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
