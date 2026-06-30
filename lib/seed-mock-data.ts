import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const supabaseUrl = "https://xgvhabhalgrqdrwvvlae.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhndmhhYmhhbGdycWRyd3Z2bGFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzNjQ5ODEsImV4cCI6MjA5Nzk0MDk4MX0.-RNdvqUkaMZNsmjOgHzZIfg5lF19Y5oFHsYWUwr_Kxg";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================================================
// MOCK DATA GENERATOR
// ============================================================================

export async function seedMockData() {
  console.log('🌱 Starting mock data seed...');

  try {
    // 1. Create Tenants (Bus Operators/Franchises)
    console.log('📝 Creating tenants...');
    const tenants = await createTenants();

    // 2. Create Tenant Branding
    console.log('🎨 Creating tenant branding...');
    await createTenantBranding(tenants);

    // 3. Create Users (Super Admin, Operators, Passengers)
    console.log('👥 Creating users...');
    const users = await createUsers(tenants);

    // 4. Create Routes
    console.log('🛣️  Creating routes...');
    const routes = await createRoutes(tenants);

    // 5. Create Buses
    console.log('🚌 Creating buses...');
    const buses = await createBuses(tenants);

    // 6. Create Schedules
    console.log('📅 Creating schedules...');
    const schedules = await createSchedules(tenants, routes, buses);

    // 7. Create Seats for each Schedule
    console.log('💺 Creating seats...');
    await createSeats(schedules, buses);

    // 8. Create Sample Bookings
    console.log('🎫 Creating bookings...');
    await createBookings(tenants, schedules, users, buses);

    console.log('✅ Mock data seed completed successfully!');
    return { tenants, users, routes, buses, schedules };
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    throw error;
  }
}

// ============================================================================
// CREATE TENANTS
// ============================================================================

async function createTenants() {
  const tenantData = [
    {
      name: 'slt-travels',
      operator_name: 'SLT Travels',
      subscription_plan: 'pro',
      status: 'active',
    },
    {
      name: 'express-srilanka',
      operator_name: 'Express Sri Lanka',
      subscription_plan: 'basic',
      status: 'active',
    },
    {
      name: 'royal-bus-service',
      operator_name: 'Royal Bus Service',
      subscription_plan: 'enterprise',
      status: 'active',
    },
    {
      name: 'colombo-intercity',
      operator_name: 'Colombo Intercity Transport',
      subscription_plan: 'pro',
      status: 'active',
    },
  ];

  const { data, error } = await supabase
    .from('tenants')
    .insert(tenantData)
    .select();

  if (error) throw error;
  return data || [];
}

// ============================================================================
// CREATE TENANT BRANDING
// ============================================================================

async function createTenantBranding(tenants: any[]) {
  const brandingData = [
    {
      tenant_id: tenants[0].id,
      primary_color: '#1e40af',
      secondary_color: '#f59e0b',
      accent_color: '#10b981',
      logo_url: 'https://via.placeholder.com/150?text=SLT+Travels',
      favicon_url: 'https://via.placeholder.com/32?text=SLT',
      font_family: 'Plus Jakarta Sans',
      border_radius: '8px',
      custom_domain: 'slt.vivid.local',
    },
    {
      tenant_id: tenants[1].id,
      primary_color: '#dc2626',
      secondary_color: '#fbbf24',
      accent_color: '#0ea5e9',
      logo_url: 'https://via.placeholder.com/150?text=Express+SL',
      favicon_url: 'https://via.placeholder.com/32?text=EXPRESS',
      font_family: 'Plus Jakarta Sans',
      border_radius: '6px',
      custom_domain: 'express.vivid.local',
    },
    {
      tenant_id: tenants[2].id,
      primary_color: '#7c3aed',
      secondary_color: '#fbbf24',
      accent_color: '#ec4899',
      logo_url: 'https://via.placeholder.com/150?text=Royal+Bus',
      favicon_url: 'https://via.placeholder.com/32?text=ROYAL',
      font_family: 'Plus Jakarta Sans',
      border_radius: '10px',
      custom_domain: 'royal.vivid.local',
    },
    {
      tenant_id: tenants[3].id,
      primary_color: '#059669',
      secondary_color: '#f97316',
      accent_color: '#0d9488',
      logo_url: 'https://via.placeholder.com/150?text=Colombo',
      favicon_url: 'https://via.placeholder.com/32?text=COLOMBO',
      font_family: 'Plus Jakarta Sans',
      border_radius: '8px',
      custom_domain: 'colombo.vivid.local',
    },
  ];

  const { error } = await supabase
    .from('tenant_branding')
    .insert(brandingData);

  if (error) throw error;
}

// ============================================================================
// CREATE USERS
// ============================================================================

async function createUsers(tenants: any[]) {
  const usersData = [
    // Super Admin
    {
      email: 'superadmin@vivid.com',
      first_name: 'Admin',
      last_name: 'Master',
      role: 'super_admin',
      tenant_id: null,
      is_active: true,
      phone: '+94701234567',
    },
    // Operator/Fleet Managers for each tenant
    ...tenants.flatMap((tenant, idx) => [
      {
        email: `operator@${tenant.name}.com`,
        first_name: 'Operator',
        last_name: tenant.operator_name.split(' ')[0],
        role: 'operator',
        tenant_id: tenant.id,
        is_active: true,
        phone: `+9470${100 + idx}00000`,
      },
      {
        email: `staff@${tenant.name}.com`,
        first_name: 'Staff',
        last_name: 'Member',
        role: 'operator_staff',
        tenant_id: tenant.id,
        is_active: true,
        phone: `+9470${200 + idx}00000`,
      },
    ]),
    // Passengers
    ...Array.from({ length: 20 }).map((_, i) => ({
      email: `passenger${i + 1}@example.com`,
      first_name: `Passenger`,
      last_name: `User${i + 1}`,
      role: 'passenger' as const,
      tenant_id: null,
      is_active: true,
      phone: `+9470${300 + i}00000`,
    })),
  ];

  const { data, error } = await supabase
    .from('users')
    .insert(usersData)
    .select();

  if (error) throw error;
  return data || [];
}

// ============================================================================
// CREATE ROUTES
// ============================================================================

async function createRoutes(tenants: any[]) {
  const routes = [];

  const routePatterns = [
    {
      from_city: 'Colombo',
      to_city: 'Kandy',
      distance_km: 115,
      duration_hours: 3,
    },
    {
      from_city: 'Colombo',
      to_city: 'Galle',
      distance_km: 120,
      duration_hours: 3,
    },
    {
      from_city: 'Kandy',
      to_city: 'Nuwara Eliya',
      distance_km: 68,
      duration_hours: 2,
    },
    {
      from_city: 'Galle',
      to_city: 'Matara',
      distance_km: 45,
      duration_hours: 1.5,
    },
    {
      from_city: 'Colombo',
      to_city: 'Jaffna',
      distance_km: 400,
      duration_hours: 10,
    },
  ];

  for (const tenant of tenants) {
    for (const route of routePatterns) {
      routes.push({
        tenant_id: tenant.id,
        route_name: `${route.from_city} - ${route.to_city}`,
        from_city: route.from_city,
        to_city: route.to_city,
        distance_km: route.distance_km,
        estimated_duration_hours: route.duration_hours,
        is_active: true,
      });
    }
  }

  const { data, error } = await supabase
    .from('routes')
    .insert(routes)
    .select();

  if (error) throw error;
  return data || [];
}

// ============================================================================
// CREATE BUSES
// ============================================================================

async function createBuses(tenants: any[]) {
  const buses = [];
  const busTypes = ['AC Semi Luxury', 'AC Luxury', 'Standard', 'Premium'];

  for (const tenant of tenants) {
    for (let i = 0; i < 5; i++) {
      const busType = busTypes[i % busTypes.length];
      const totalSeats = busType === 'Standard' ? 40 : 32;

      buses.push({
        tenant_id: tenant.id,
        registration_number: `SL-${tenant.name.substring(0, 3).toUpperCase()}-${String(i + 1).padStart(4, '0')}`,
        bus_type: busType,
        total_seats: totalSeats,
        amenities: ['WiFi', 'USB Charging', 'Reading Light'].filter(
          () => Math.random() > 0.3
        ),
        ac_enabled: Math.random() > 0.2,
        wifi_enabled: Math.random() > 0.3,
      });
    }
  }

  const { data, error } = await supabase
    .from('buses')
    .insert(buses)
    .select();

  if (error) throw error;
  return data || [];
}

// ============================================================================
// CREATE SCHEDULES
// ============================================================================

async function createSchedules(
  tenants: any[],
  routes: any[],
  buses: any[]
) {
  const schedules = [];

  for (const tenant of tenants) {
    const tenantRoutes = routes.filter((r) => r.tenant_id === tenant.id);
    const tenantBuses = buses.filter((b) => b.tenant_id === tenant.id);

    for (const route of tenantRoutes) {
      for (const bus of tenantBuses.slice(0, 2)) {
        // Multiple schedules per route/bus
        for (let day = 0; day < 7; day++) {
          const now = new Date();
          const departureTime = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate() + day,
            6 + Math.floor(Math.random() * 12),
            Math.floor(Math.random() * 60),
            0
          );

          const durationHours = route.estimated_duration_hours || 3;
          const arrivalTime = new Date(
            departureTime.getTime() + durationHours * 60 * 60 * 1000
          );

          schedules.push({
            tenant_id: tenant.id,
            route_id: route.id,
            bus_id: bus.id,
            departure_time: departureTime.toISOString(),
            arrival_time: arrivalTime.toISOString(),
            base_fare: Math.floor(Math.random() * 2000) + 500,
            is_active: true,
          });
        }
      }
    }
  }

  const { data, error } = await supabase
    .from('schedules')
    .insert(schedules)
    .select();

  if (error) throw error;
  return data || [];
}

// ============================================================================
// CREATE SEATS
// ============================================================================

async function createSeats(schedules: any[], buses: any[]) {
  const seatsBatch = [];

  for (const schedule of schedules) {
    const bus = buses.find((b) => b.id === schedule.bus_id);
    const totalSeats = bus?.total_seats || 32;

    for (let seatNum = 1; seatNum <= totalSeats; seatNum++) {
      const row = Math.ceil(seatNum / 4);
      const col = String.fromCharCode(65 + ((seatNum - 1) % 4)); // A, B, C, D
      const seatNumber = `${row}${col}`;

      seatsBatch.push({
        schedule_id: schedule.id,
        bus_id: schedule.bus_id,
        seat_number: seatNumber,
        status: Math.random() > 0.7 ? 'booked' : 'available',
        booked_by: null,
        lock_token: null,
        locked_at: null,
        lock_expires_at: null,
      });
    }
  }

  // Insert in batches of 500
  for (let i = 0; i < seatsBatch.length; i += 500) {
    const batch = seatsBatch.slice(i, i + 500);
    const { error } = await supabase.from('seats').insert(batch);
    if (error) throw error;
  }
}

// ============================================================================
// CREATE BOOKINGS
// ============================================================================

async function createBookings(
  tenants: any[],
  schedules: any[],
  users: any[],
  buses: any[]
) {
  const bookings = [];
  const passengers = users.filter((u) => u.role === 'passenger').slice(0, 10);

  // Create 15 sample bookings
  for (let i = 0; i < 15; i++) {
    const schedule = schedules[Math.floor(Math.random() * schedules.length)];
    const passenger = passengers[i % passengers.length];
    const bus = buses.find((b) => b.id === schedule.bus_id);
    const seatCount = Math.floor(Math.random() * 3) + 1;

    // Generate seat numbers
    const seats = [];
    for (let s = 0; s < seatCount; s++) {
      const row = Math.ceil((s + Math.floor(Math.random() * 20)) / 4);
      const col = String.fromCharCode(65 + (s % 4));
      seats.push(`${row}${col}`);
    }

    const totalPrice =
      (schedule.base_fare * seatCount * (Math.random() * 0.2 + 0.9)) | 0;

    bookings.push({
      tenant_id: schedule.tenant_id,
      schedule_id: schedule.id,
      user_id: passenger.id,
      seats_booked: seats,
      total_price: totalPrice,
      status: ['pending', 'confirmed', 'completed'][Math.floor(Math.random() * 3)],
      booking_ref: `BK-${Date.now()}-${i}`,
      version: 1,
    });
  }

  const { error } = await supabase
    .from('bookings')
    .insert(bookings)
    .select();

  if (error) throw error;
}

export default seedMockData;
