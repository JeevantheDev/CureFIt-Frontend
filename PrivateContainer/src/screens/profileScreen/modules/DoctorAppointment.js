import { Grid } from '@material-ui/core';
import { Profile } from 'curefit';
import React, { useContext, useEffect } from 'react';
import { FormContext } from '../../../app/context/form.context';

import AppointmentForm from '../../../components/AppointmentForm/AppointmentForm';
import { ClinicDetails } from '../../../components/ClinicDetails/ClinicDetails';
import { ProfileContext } from '../context/profile.context';

const DoctorAppointment = React.memo((props) => {
  const { slug: profileId } = props.match.params;

  const {
    loaderState: [pageLoading],
    profileState: [currentProfile],
    clinicState: [clinics],
    fetchProfileById,
  } = useContext(ProfileContext);

  useEffect(() => {
    fetchProfileById(profileId);
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <AppointmentForm profile_id={profileId} />
      </Grid>
      <Grid item xs={12} md={4}>
        <ClinicDetails inGroup={false} clinics={clinics} isLoading={pageLoading} />
      </Grid>
      <Grid item xs={12} md={4}>
        <Profile horizontal={false} profile={currentProfile} isLoading={pageLoading} />
      </Grid>
    </Grid>
  );
});

// eslint-disable-next-line import/no-default-export
export default DoctorAppointment;
