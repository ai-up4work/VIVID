'use client';
import { BookingProvider } from '../contexts/BookingContext';
import { ToastProvider } from '../contexts/ToastContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <BookingProvider>
        {children}
      </BookingProvider>
    </ToastProvider>
  );
}
