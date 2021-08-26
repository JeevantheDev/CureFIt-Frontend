import React, { useContext, useEffect } from 'react';
import { ProfileContext } from '../context/profile.context';
import { Profile } from 'curefit';
import { Grid } from '@material-ui/core';
import { ClinicDetails } from '../../../components/ClinicDetails/ClinicDetails';
import { AppointmentForm } from '../../../components/AppointmentForm/AppointmentForm';

const DoctorAppointment = (props) => {
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
        <AppointmentForm />
      </Grid>
      <Grid item xs={12} md={4}>
        <ClinicDetails inGroup={false} clinics={clinics} isLoading={pageLoading} />
      </Grid>
      <Grid item xs={12} md={4}>
        <Profile horizontal={false} profile={currentProfile} isLoading={pageLoading} />
      </Grid>
    </Grid>
  );
};

// eslint-disable-next-line import/no-default-export
export default DoctorAppointment;
