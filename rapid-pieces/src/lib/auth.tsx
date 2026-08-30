'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'buyer' | 'seller' | 'admin' | null;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  location?: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: UserRole, email: string, password: string) => boolean;
  register: (role: UserRole, data: Partial<User> & { password?: string }) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  register: () => false,
  logout: () => {},
  isLoading: true,
});

// Mock users database
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'admin@rapidpieces.com': {
    password: 'embr@y@ge',
    user: { id: 'admin1', name: 'Administrateur', email: 'admin@rapidpieces.com', role: 'admin' }
  },
  'vendeur@rapidpieces.com': {
    password: 'vendeur123',
    user: { id: 's1', name: 'Auto Pièces Cotonou', email: 'vendeur@rapidpieces.com', role: 'seller', phone: '+229 97 12 34 56', location: 'Cotonou' }
  },
  'acheteur@rapidpieces.com': {
    password: 'acheteur123',
    user: { id: 'b1', name: 'Jean Kakpassi', email: 'acheteur@rapidpieces.com', role: 'buyer', phone: '+229 96 23 45 67', location: 'Cotonou' }
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load user from localStorage on mount
    const stored = localStorage.getItem('rp_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('rp_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (role: UserRole, email: string, password: string): boolean => {
    // Admin login
    if (role === 'admin' && email === 'admin' && password === 'embr@y@ge') {
      const adminUser: User = { id: 'admin1', name: 'Administrateur', email: 'admin@rapidpieces.com', role: 'admin' };
      setUser(adminUser);
      localStorage.setItem('rp_user', JSON.stringify(adminUser));
      return true;
    }

    // Check mock users
    const mockUser = MOCK_USERS[email];
    if (mockUser && mockUser.password === password && mockUser.user.role === role) {
      setUser(mockUser.user);
      localStorage.setItem('rp_user', JSON.stringify(mockUser.user));
      return true;
    }

    // Check registered users in localStorage
    const registered = localStorage.getItem('rp_registered_users');
    if (registered) {
      try {
        const users: Record<string, { password: string; user: User }> = JSON.parse(registered);
        const found = users[email];
        if (found && found.password === password && found.user.role === role) {
          setUser(found.user);
          localStorage.setItem('rp_user', JSON.stringify(found.user));
          return true;
        }
      } catch {}
    }

    return false;
  };

  const register = (role: UserRole, data: Partial<User> & { password?: string }): boolean => {
    if (!role || !data.email || !data.name) return false;
    
    const newUser: User = {
      id: `${role}_${Date.now()}`,
      name: data.name,
      email: data.email,
      role,
      phone: data.phone,
      location: data.location,
    };
    
    // Save to registered users
    const registered = localStorage.getItem('rp_registered_users');
    let users: Record<string, { password: string; user: User }> = {};
    if (registered) {
      try { users = JSON.parse(registered); } catch {}
    }
    users[data.email] = { password: data.password || '', user: newUser };
    localStorage.setItem('rp_registered_users', JSON.stringify(users));
    
    setUser(newUser);
    localStorage.setItem('rp_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rp_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

// Route protection helper
export function getHomeRoute(role: UserRole): string {
  switch (role) {
    case 'admin': return '/admin';
    case 'seller': return '/seller';
    case 'buyer': return '/';
    default: return '/welcome';
  }
}
