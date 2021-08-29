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

export const APPOINTMENT_TYPE = [
  {
    type: '1',
    label: () => (
      <Box display="flex">
        <PersonIcon />
        (Person)
      </Box>
    ),
  },
  {
    type: '2',
    label: () => (
      <Box display="flex">
        <VideoCallIcon />
        (VideoCall)
      </Box>
    ),
  },
  {
    type: '3',
    label: () => (
      <Box display="flex">
        <ChatIcon />
        (Chat)
      </Box>
    ),
  },
  {
    type: '1,2',
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
