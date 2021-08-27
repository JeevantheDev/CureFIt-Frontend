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
