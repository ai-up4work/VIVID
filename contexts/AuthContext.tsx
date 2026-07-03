'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'passenger' | 'operator' | 'super_admin';

export type MockUser = {
  id: string;
  email: string;
  phone: string;
  role: UserRole;
  user_metadata: {
    full_name: string;
    avatar_url: string;
  };
};

export type LoginParams = {
  identifier?: string;
  email?: string;
  phone?: string;
  role?: UserRole;
  fullName?: string;
};

type AuthContextValue = {
  user: MockUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (params?: LoginParams) => void;
  logout: () => void;
};

const DEFAULT_MOCK_USER: MockUser = {
  id: 'mock-user-1',
  email: 'alex.ham@vivid.com',
  phone: '+94771234567',
  role: 'passenger',
  user_metadata: {
    full_name: 'Alex Ham',
    avatar_url: 'https://ui-avatars.com/api/?name=Alex+Ham&background=050a44&color=fff',
  },
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(DEFAULT_MOCK_USER);

  const login: AuthContextValue['login'] = (params = {}) => {
    const {
      identifier,
      email,
      phone,
      role = 'passenger',
      fullName = DEFAULT_MOCK_USER.user_metadata.full_name,
    } = params;

    let resolvedEmail = email || DEFAULT_MOCK_USER.email;
    let resolvedPhone = phone || DEFAULT_MOCK_USER.phone;

    if (identifier) {
      if (identifier.includes('@')) {
        resolvedEmail = identifier;
      } else {
        resolvedPhone = identifier;
      }
    }

    setUser({
      id: 'mock-user-1',
      email: resolvedEmail,
      phone: resolvedPhone,
      role,
      user_metadata: {
        full_name: fullName || DEFAULT_MOCK_USER.user_metadata.full_name,
        avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          fullName || DEFAULT_MOCK_USER.user_metadata.full_name
        )}&background=050a44&color=fff`,
      },
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, isLoading: false, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}