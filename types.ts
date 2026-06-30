export type ViewState = 'search' | 'seat-selection' | 'confirmation';
export type UserRole = 'super_admin' | 'operator' | 'passenger' | 'operator_staff';

export interface BusTrip {
  id: string;
  operator: string;
  type: string;
  departureTime: string;
  arrivalTime: string;
  originCode: string;
  originCity: string;
  destinationCode: string;
  destinationCity: string;
  duration: string;
  stops: string;
  remainingSeats: number;
  price: number;
  logoUrl?: string;
}

// Tenant/Operator Types
export interface TenantBranding {
  tenantId: string;
  operatorName: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logoUrl: string;
  faviconUrl: string;
  backgroundUrl?: string;
  fontFamily: string;
  borderRadius: string;
  customDomain?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Operator {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  totalBuses: number;
  activeRoutes: number;
  monthlyRevenue: number;
  status: 'active' | 'inactive' | 'suspended';
  subscription: 'basic' | 'pro' | 'enterprise';
  branding: TenantBranding;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  tenantId?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TenantContext {
  tenantId: string;
  operatorName: string;
  branding: TenantBranding;
  userRole: UserRole;
}
