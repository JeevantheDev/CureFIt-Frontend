export const API_ROUTES = {
  // Profile API Routes
  PROFILE_BY_ID: '/profile/id',
  CREATE_PROFILE: '/profile',
  UPDATE_PROFILE: '/profile/id',
  // Auth API Routes
  UPDATE_DETAILS: '/auth/updateDetails',
  UPDATE_PASSWORD: '/auth/updatepassword',

  // Clinic Routes
  CREATE_CLINIC: '/profile/id/clinic',
  GET_CLINICS_BY_DOCTOR: '/clinic',
  UPDATE_CLINIC: '/clinic/id',

  // Appointment Routes
  GET_APPOINTMENTS: '/appointment',
  CREATE_APPOINTMENT: '/profile/id/appointment',
  UPDATE_DELETE_APPOINTMENT: '/appointment/id',

  // Review routes
  CREATE_REVIEW: '/review/reviewFor/id',
  UPDATE_DELETE_REVIEW: '/review/id',
};
