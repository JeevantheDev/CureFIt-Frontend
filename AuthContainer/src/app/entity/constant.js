import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import StorefrontIcon from '@material-ui/icons/Storefront';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

export const USER_TYPE = [
  { icon: LocalHospitalIcon, type: 'doctor.', value: '1' },
  { icon: StorefrontIcon, type: 'seller.', value: '2' },
  { icon: PersonAddIcon, type: 'user', value: '3' },
];

export const ROLES = {
  1: 'DOCTOR',
  2: 'SELLER',
  3: 'USER',
};

export const RESPONSE = {
  NETWORK_ERROR: 'PLEASE CHECK YOUR NETWORK',
};
