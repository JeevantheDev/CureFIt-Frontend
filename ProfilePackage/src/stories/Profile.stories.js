import { Container, Grid } from '@material-ui/core';
import { storiesOf } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Component
import Profile from '../lib/Profile/Profile';

const profile = {
  specializations: ['Kidney'],
  overall_city: ['Corbin', 'Kingston'],
  total_experience: 3,
  _id: '611202e86d9eb70008c19b21',
  education: [
    {
      _id: '61174a79ab3ce300095ea880',
      college: 'AIIMS, BBSR',
      degree: 'MBBS',
      year: '2000-2006',
    },
  ],
  average_rating: 4.5,
  experience: [
    {
      _id: '61174a79ab3ce300095ea881',
      work_place: 'VIMSAR, Burla',
      position: 'Jr. Doctor',
      year: '2006-2007',
    },
    {
      _id: '61174a79ab3ce300095ea882',
      work_place: 'SUM, BBSR',
      position: 'Sr. Doctor',
      year: '2008-2010',
    },
  ],
  training_certificates: [
    {
      _id: '61174a79ab3ce300095ea883',
      name: 'Social Activity',
      year: '2002',
    },
  ],
  user_id: '610e54b7c5eefa00086bd06a',
  created_at: '2021-08-10T04:39:04.138Z',
  slug: 'dr.-john-doe',
  __v: 0,
  user: {
    user_type: '1',
    _id: '610e54b7c5eefa00086bd06a',
    user_name: 'Dr. John Doe',
    user_email: 'john@gmail.com',
    created_at: '2021-08-07T09:39:03.858Z',
    avatar: 'http://www.gravatar.com/avatar/1f9d9a9efc2f523b2f09629444632b5c',
    __v: 0,
  },
  reviews: [
    {
      _id: '6107c6e6576dc70e28eda023',
      review_for: 'DocProfile',
      review_title: 'Nice Experience GG',
      review_desc: 'Very nice doctors and very polite and humble human being.',
      rating: 4.5,
      review_of: '6107c69a576dc70e28eda00e',
      user_id: '6107c635576dc70e28eda001',
      __v: 0,
    },
  ],
  clinics: [
    {
      location: {
        type: 'Point',
        coordinates: [-71.525909, 41.483657],
        city: 'Kingston',
        state: 'RI',
        zipcode: '02881-2003',
        country: 'US',
      },
      _id: '611756dc3c8f860008058413',
      clinic_name: 'Apollo Medical',
      clinic_address: '45 Upper College Rd Kingston RI 02881',
      contact_no: '+918526324120',
      waiting_time: '30mins',
      fees: 450,
      doc_profile_id: '611202e86d9eb70008c19b21',
      user_id: '610e54b7c5eefa00086bd06a',
      available_slots: [
        {
          is_doc_available: true,
          time_slots: ['10.30AM', '11.00AM', '11.30AM', '12.00PM'],
          _id: '61175ba7b79e8c00079c5711',
          date: '2021-02-08T00:00:00.000Z',
          total_slots: 4,
        },
      ],
      created_at: '2021-08-14T05:38:36.859Z',
      __v: 0,
      reviews: [],
      id: '611756dc3c8f860008058413',
    },
    {
      location: {
        type: 'Point',
        coordinates: [-71.525909, 41.483657],
        city: 'Kingston',
        state: 'RI',
        zipcode: '02881-2003',
        country: 'US',
      },
      _id: '611756dc3c8f860008058413',
      clinic_name: 'Apollo Medical',
      clinic_address: '45 Upper College Rd Kingston RI 02881',
      contact_no: '+918526324120',
      waiting_time: '30mins',
      fees: 450,
      doc_profile_id: '611202e86d9eb70008c19b21',
      user_id: '610e54b7c5eefa00086bd06a',
      available_slots: [
        {
          is_doc_available: true,
          time_slots: ['10.30AM', '11.00AM', '11.30AM', '12.00PM'],
          _id: '61175ba7b79e8c00079c5711',
          date: '2021-02-08T00:00:00.000Z',
          total_slots: 4,
        },
      ],
      created_at: '2021-08-14T05:38:36.859Z',
      __v: 0,
      reviews: [],
      id: '611756dc3c8f860008058413',
    },
  ],
  id: '611202e86d9eb70008c19b21',
};

const stories = storiesOf('Doctor-Profile', module);

stories.add('App', () => {
  const [loading, setLoading] = useState(true);
  const [currProfile, setCurrProfile] = useState();

  const BASE_API = 'http://localhost:5000/.netlify/functions/server/dev/api/v1';

  useEffect(() => {
    fetchData('6107c69a576dc70e28eda00e');
  }, []);

  const fetchData = async (id) => {
    let res = await axios.get(`${BASE_API}/profile/${id}`);
    setCurrProfile(res.data.data.docProfile);
    setLoading(!loading);
    return res.data;
  };

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Profile
            profile={currProfile}
            horizontal={true}
            isLoading={loading}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Profile profile={profile} horizontal={false} isLoading={false} />
        </Grid>
      </Grid>
    </Container>
  );
});
