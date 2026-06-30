'use client';
import React, { createContext, useContext, ReactNode } from 'react';
import { TenantContext as TenantContextType, TenantBranding } from '../types';

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ 
  children, 
  value 
}: { 
  children: ReactNode;
  value: TenantContextType;
}) {
  return (
    <TenantContext.Provider value={value}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant(): TenantContextType {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within TenantProvider');
  }
  return context;
}

export function useBranding(): TenantBranding {
  const { branding } = useTenant();
  return branding;
}
