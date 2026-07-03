'use client';
import { AuthProvider } from '../contexts/AuthContext';
import { BookingProvider } from '../contexts/BookingContext';
import { ToastProvider } from '../contexts/ToastContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <BookingProvider>
          {children}
        </BookingProvider>
      </ToastProvider>
    </AuthProvider>
  );
}