export const DEFAULT = {
  LIMIT: 0,
  PAGE: 0,
  SEARCH: '',
  LOCATION: '',
  SPECALISTS: 'all',
  EXPERIENCE: 'all',
};

export const SCREEN = {
  VIEW_PROFILE: 'View Profile',
  BOOK_APPOINTMENT: 'Appointment',
};

export const SERVICES = {
  LANDING: {
    CONSULT: [
      {
        image: require('../../assets/media/service/cold-fever.png'),
        label: 'Cold, cough or fever',
        value: 'Cold or Cough or Fever',
      },
      { image: require('../../assets/media/service/child.png'), label: 'Child not feeling good', value: 'Child' },
      {
        image: require('../../assets/media/service/depression.png'),
        label: 'Depression or anxiety',
        value: 'Depression or Anxiety',
      },
      { image: require('../../assets/media/service/kidney.png'), label: 'Kidney and urine', value: 'Kidney and Urine' },
      {
        image: require('../../assets/media/service/physician.png'),
        label: 'General physician',
        value: 'General Physician',
      },
    ],
  },
};

export const REVIEWS = [
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus consectetur arcu quis dui, nec in faucibus. Consequat in sapien sit massa at ultrices.',
    avatar: require('../../assets/media/marry.png'),
    name: 'Marry Doe',
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus consectetur arcu quis dui, nec in faucibus. Consequat in sapien sit massa at ultrices.',
    avatar: require('../../assets/media/leeza.png'),
    name: 'Leeza Doe',
  },
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus consectetur arcu quis dui, nec in faucibus. Consequat in sapien sit massa at ultrices.',
    avatar: require('../../assets/media/john.png'),
    name: 'John Doe',
  },
];
