'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TRIPS } from '../components/data';

type Trip = typeof TRIPS[0];

interface BookingContextType {
  trips: Trip[];
  selectedTripId: string | null;
  setSelectedTripId: (id: string | null) => void;
  selectedSeats: string[];
  setSelectedSeats: (seats: string[]) => void;
  searchParams: { origin: string; dest: string; date: string; pax: string };
  setSearchParams: (params: { origin: string; dest: string; date: string; pax: string }) => void;
  clearBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useState({ origin: '', dest: '', date: '', pax: '1' });

  const clearBooking = () => {
    setSelectedTripId(null);
    setSelectedSeats([]);
  };

  return (
    <BookingContext.Provider
      value={{
        trips: TRIPS,
        selectedTripId,
        setSelectedTripId,
        selectedSeats,
        setSelectedSeats,
        searchParams,
        setSearchParams,
        clearBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
