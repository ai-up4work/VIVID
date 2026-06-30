import React from 'react';

export default function PassengerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Passenger layout can add any passenger-specific wrapper here
  // Currently just renders children - inherits public layout from parent
  return <>{children}</>;
}
