import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  avatarUrl: string | null;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
  updateAvatar: (url: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = () => {
    setIsAuthenticated(true);
    setUser({ name: 'Alex Johnson', email: 'alex.j@example.com', avatarUrl: null });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const updateAvatar = (url: string) => {
    if (user) {
      setUser({ ...user, avatarUrl: url });
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, updateAvatar }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
