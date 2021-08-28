import { CONTAINER_ROUTES } from '../router/ApplicationRoutes';

export const FILTER_SECTION = {
  PRODUCT_CATEGORIES: ['Medcines', 'Skin Care', 'Nutrition', 'Personal Care', 'Home Care', 'Ortho Care', 'Pet Care'],
  SPECALISTS: [
    'Medicine',
    'Dentist',
    'Cold or Cough or Fever',
    'Child',
    'Depression or Anxiety',
    'Kidney and Urine',
    'General Physician',
  ],
  EXPERIENCE: [
    { value: 'all', name: 'By Experience' },
    { value: '5', name: 'Total Experience <= 5' },
    { value: '10', name: 'Total Experience <= 10' },
    { value: '15', name: 'Total Experience <= 15' },
    { value: '20', name: 'Total Experience <= 20' },
  ],
};

export const USER_TYPE = {
  ADMIN: '0',
  DOCTOR: '1',
  SELLER: '2',
  USER: '3',
};

export const ROLES = Object.keys(USER_TYPE).reduce((obj, key) => {
  obj[USER_TYPE[key]] = key;
  return obj;
}, {});

export const SIDEBAR_PANELS = {
  ADMIN: [
    { link: 'Dashboard', path: CONTAINER_ROUTES.PRIVATE_ADMIN_DASHBOARD },
    { link: 'Doctors', path: CONTAINER_ROUTES.PRIVATE_ADMIN_DOCTORS },
    { link: 'Clinics', path: CONTAINER_ROUTES.PRIVATE_ADMIN_CLINICS },
    { link: 'Appointments', path: CONTAINER_ROUTES.PRIVATE_ADMIN_APPOINTMENT },
    { link: 'Sellers', path: CONTAINER_ROUTES.PRIVATE_ADMIN_SELLERS },
    { link: 'Products', path: CONTAINER_ROUTES.PRIVATE_ADMIN_PRODUCTS },
    { link: 'Orders', path: CONTAINER_ROUTES.PRIVATE_ADMIN_ORDERS },
    { link: 'Users', path: CONTAINER_ROUTES.PRIVATE_ADMIN_USERS },
  ],
  DOCTOR: [
    { link: 'Dashboard', path: CONTAINER_ROUTES.PRIVATE_DOCTOR_DASHBOARD },
    { link: 'Profile', path: CONTAINER_ROUTES.PRIVATE_DOCTOR_PROFILE },
    { link: 'Clinics', path: CONTAINER_ROUTES.PRIVATE_DOCTOR_CLINICS },
    { link: 'Appointments', path: CONTAINER_ROUTES.PRIVATE_DOCTOR_APPOINTMENTS },
    { link: 'My Appointments', path: CONTAINER_ROUTES.PRIVATE_DOCTOR_APPOINTMENTS_ME },
    { link: 'Patients', path: CONTAINER_ROUTES.PRIVATE_DOCTOR_PATIENTS },
    { link: 'Orders', path: CONTAINER_ROUTES.PRIVATE_DOCTOR_ORDERS },
  ],
  SELLER: [
    { link: 'Dashboard', path: CONTAINER_ROUTES.PRIVATE_SELLER_DASHBOARD },
    { link: 'Products', path: CONTAINER_ROUTES.PRIVATE_SELLER_PRODUCTS },
    { link: 'Orders', path: CONTAINER_ROUTES.PRIVATE_SELLER_ORDERS },
    { link: 'My Orders', path: CONTAINER_ROUTES.PRIVATE_SELLER_ORDERS_ME },
    { link: 'Appointments', path: CONTAINER_ROUTES.PRIVATE_SELLER_APPOINTMENTS },
  ],
  USER: [
    { link: 'Dashboard', path: CONTAINER_ROUTES.PRIVATE_USER_DASHBOARD },
    { link: 'Orders', path: CONTAINER_ROUTES.PRIVATE_USER_ORDERS },
    { link: 'Appointments', path: CONTAINER_ROUTES.PRIVATE_USER_APPOINTMENTS },
    { link: 'Doctors', path: CONTAINER_ROUTES.PRIVATE_USER_DOCTORS },
  ],
};
