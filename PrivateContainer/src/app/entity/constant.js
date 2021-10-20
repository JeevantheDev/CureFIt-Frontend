import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import ChatIcon from '@material-ui/icons/Chat';
import { Box } from '@material-ui/core';

import { ClinicInfo } from '../../components/ProfileDetails/Info/ClinicInfo';
import { Educations } from '../../components/ProfileDetails/Info/Educations';
import { Experiences } from '../../components/ProfileDetails/Info/Experiences';
import { Specalizations } from '../../components/ProfileDetails/Info/Specalizations';
import { TrainingCertificates } from '../../components/ProfileDetails/Info/TrainingCertificates';

export const REVIEW_MODEL = {
  PROFILE: 'DocProfile',
  CLINIC: 'Clinic',
};

export const INFO_TABS = {
  label: ['Info', 'Specalization', 'Education', 'Experience', 'Training & Certificates'],
  panels: [ClinicInfo, Specalizations, Educations, Experiences, TrainingCertificates],
};

export const DEFAULT = {
  LIMIT: 0,
  PAGE: 0,
  SEARCH: '',
  LOCATION: '',
  SPECALISTS: 'all',
  EXPERIENCE: 'all',
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

export const APPOINTMENT_TYPE = [
  {
    type: '1',
    value: 'person',
    label: () => (
      <Box display="flex">
        <PersonIcon />
        (Person)
      </Box>
    ),
  },
  {
    type: '2',
    value: 'video',
    label: () => (
      <Box display="flex">
        <VideoCallIcon />
        (VideoCall)
      </Box>
    ),
  },
  {
    type: '3',
    value: 'chat',
    label: () => (
      <Box display="flex">
        <ChatIcon />
        (Chat)
      </Box>
    ),
  },
  {
    type: '1,2',
    value: 'person&video',
    label: () => (
      <Box display="flex">
        Both <PersonIcon />
        (Person)
        <VideoCallIcon />
        (VideoCall)
      </Box>
    ),
  },
  {
    type: '2,3',
    value: 'video&chat',
    label: () => (
      <Box display="flex">
        Both
        <VideoCallIcon />
        (VideoCall)
        <ChatIcon />
        (Chat)
      </Box>
    ),
  },
];

export const APPOINTMENT_FORMAT = {
  1: (
    <Box display="flex">
      <PersonIcon />
      (Person)
    </Box>
  ),
  2: (
    <Box display="flex">
      <VideoCallIcon />
      (VideoCall)
    </Box>
  ),
  3: (
    <Box display="flex">
      <ChatIcon />
      (Chat)
    </Box>
  ),
  '1,2': (
    <Box display="flex">
      Both <PersonIcon />
      (Person)
      <VideoCallIcon />
      (VideoCall)
    </Box>
  ),
  '2,3': (
    <Box display="flex">
      Both
      <VideoCallIcon />
      (VideoCall)
      <ChatIcon />
      (Chat)
    </Box>
  ),
};

export const PRODUCT_CATEGORIES = [
  'Medcines',
  'Skin Care',
  'Nutrition',
  'Personal Care',
  'Home Care',
  'Ortho Care',
  'Pet Care',
];

export const TABLE_ROWS = {
  PRODUCT_LIST: ['Product Name', 'Product Category', 'Product Price', 'Stocks', 'Average Rating', '', ''],
  ORDER_LIST: [
    'Name',
    'City',
    'Country',
    'Phone No',
    'Product Qty',
    'Price',
    'Ordered On',
    'Delivery Estimate',
    'Is Delivered ?',
    '',
  ],
  SELLER_ORDER_LIST: [
    'Name',
    'City',
    'Country',
    'Phone No',
    'Product Qty',
    'Is Paid ?',
    'Price',
    'Ordered On',
    'Delivery Estimate',
    'Is Delivered ?',
    '',
    '',
  ],
  PATIENT_LIST: [
    'User Name',
    'Patient Name',
    'Patient Age',
    'Appointment Date',
    'Appointment Slot',
    'Appointment Type',
    '',
  ],
  APPOINTMENT_LIST: [
    '',
    'Doctor Name',
    'Patient Name',
    'Patient Age',
    'Appointment Date',
    'Appointment Slot',
    'Appointment Type',
    '',
    '',
    '',
  ],
};
