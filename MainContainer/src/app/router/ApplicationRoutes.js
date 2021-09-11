const CONTAINER_ROUTES = {
  // Public Container - FE
  PUBLIC_CONTAINER: '/',
  PUBLIC_CONTAINER_PROFILES: '/profiles/all',
  PUBLIC_CONTAINER_PROFILES_SLUG: '/profiles/:slug',
  PUBLIC_CONTAINER_PROFILES_SLUG_APPOINTMENT: '/profiles/:slug/appointment',

  PUBLIC_CONTAINER_PRODUCTS: '/products',

  // Private Container - FE
  PRIVATE_CONTAINER: '/private',
  PRIVATE_UPDATE_ACCOUNT: '/private/update/account/:id',

  // Admin routes
  PRIVATE_ADMIN: '/private/admin',
  PRIVATE_ADMIN_DASHBOARD: '/private/admin/dashboard',
  PRIVATE_ADMIN_DOCTORS: '/private/admin/doctors',
  PRIVATE_ADMIN_CLINICS: '/private/admin/clinics',
  PRIVATE_ADMIN_APPOINTMENTS: '/private/admin/appointments',
  PRIVATE_ADMIN_SELLERS: '/private/admin/sellers',
  PRIVATE_ADMIN_PRODUCTS: '/private/admin/products',
  PRIVATE_ADMIN_ORDERS: '/private/admin/orders',
  PRIVATE_ADMIN_USERS: '/private/admin/users',

  // Doctor routes
  PRIVATE_DOCTOR: '/private/doctor',
  PRIVATE_DOCTOR_DASHBOARD: '/private/doctor/dashboard',
  PRIVATE_DOCTOR_PROFILE: '/private/doctor/profile',
  PRIVATE_DOCTOR_CLINICS: '/private/doctor/clinics',
  PRIVATE_DOCTOR_APPOINTMENTS: '/private/doctor/appointments',
  PRIVATE_DOCTOR_APPOINTMENTS_ME: '/private/doctor/appointments/me',
  PRIVATE_DOCTOR_PATIENTS: '/private/doctor/patients',
  PRIVATE_DOCTOR_ORDERS: '/private/doctor/orders',

  // Seller routes
  PRIVATE_SELLER: '/private/seller',
  PRIVATE_SELLER_DASHBOARD: '/private/seller/dashboard',
  PRIVATE_SELLER_PRODUCTS: '/private/seller/products',
  PRIVATE_SELLER_ORDERS: '/private/seller/orders',
  PRIVATE_SELLER_ORDERS_ME: '/private/seller/orders/me',
  PRIVATE_SELLER_APPOINTMENTS: '/private/seller/appointments',

  // User routes
  PRIVATE_USER: '/private/user',
  PRIVATE_USER_DASHBOARD: '/private/user/dashboard',
  PRIVATE_USER_ORDERS: '/private/user/orders',
  PRIVATE_USER_APPOINTMENTS: '/private/user/appointments',
  PRIVATE_USER_DOCTORS: '/private/user/doctors',

  // Auth Container - FE
  AUTH_CONTAINER: '/auth',
  AUTH_SIGNIN_CONTAINER: '/auth/signin',
  AUTH_SIGNUP_CONTAINER: '/auth/signup',
};

export { CONTAINER_ROUTES };
