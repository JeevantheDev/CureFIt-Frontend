import React from 'react';
import PersonIcon from '@material-ui/icons/Person';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import ChatIcon from '@material-ui/icons/Chat';
import { Box } from '@material-ui/core';

export const DEFAULT = {
  LIMIT: 0,
  PAGE: 0,
  SEARCH: '',
  LOCATION: '',
  SPECALISTS: 'all',
  EXPERIENCE: 'all',
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
