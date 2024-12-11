'use client';

import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthStatus {
  isAuthenticated: boolean;
  isAdmin: boolean;
}

interface AuthContextType extends AuthStatus {
  fireReload: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthStatus>({ isAuthenticated: false, isAdmin: false });
  const [reload, setReload] = useState(false);
  const router = useRouter();

  const fireReload = () => {
    setReload((prevReload) => !prevReload);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token === 'mock-admin-token') {
      setAuth({ isAuthenticated: true, isAdmin: true });
      console.log("mock-admin-token");
    } else if (token === 'mock-user-token') {
      setAuth({ isAuthenticated: true, isAdmin: false });
      console.log("mock-user-token");
    } else {
      setAuth({ isAuthenticated: false, isAdmin: false });
      console.log("no-token");
      if (window.location.pathname !== ('/login') && window.location.pathname !== ('/users/add-user')) router.push('/login');
      
    }
  }, [router, reload]);

  return (
    <AuthContext.Provider value={{ ...auth, fireReload }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
