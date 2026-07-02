'use client';
import { createContext, useContext, ReactNode } from 'react';

/**
 * MOCK AUTH — ALWAYS LOGGED IN
 * ----------------------------------------------------------------------
 * Auth is stubbed out so the UI can be built/reviewed without wiring up
 * real login flows yet. Every consumer of useAuth() gets a fake logged-in
 * user automatically — no <AuthProvider> placement required.
 * Swap this file for real Supabase auth later.
 * ----------------------------------------------------------------------
 */

export type UserRole = 'passenger' | 'operator' | 'super_admin';

export type MockUser = {
  id: string;
  email: string;
  role: UserRole;
  user_metadata: {
    full_name: string;
    avatar_url: string;
  };
};

type AuthContextValue = {
  user: MockUser | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, role?: UserRole, fullName?: string) => void;
  logout: () => void;
};

const MOCK_USER: MockUser = {
  id: 'mock-user-1',
  email: 'alex.ham@vivid.com',
  role: 'passenger',
  user_metadata: {
    full_name: 'Alex Ham',
    avatar_url: 'https://ui-avatars.com/api/?name=Alex+Ham&background=050a44&color=fff',
  },
};

const defaultValue: AuthContextValue = {
  user: MOCK_USER,
  isLoggedIn: true,
  isLoading: false,
  login: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextValue>(defaultValue);

// Provider kept as a no-op passthrough so existing <AuthProvider> wrappers
// in the tree don't need to be removed — they just no longer do anything.
export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider value={defaultValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}