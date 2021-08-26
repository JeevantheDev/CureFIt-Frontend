import React, { useContext, useEffect } from 'react';
import { ProfileContext } from '../context/profile.context';
import { Profile } from 'curefit';
import { Grid } from '@material-ui/core';
import { ClinicDetails } from '../../../components/ClinicDetails/ClinicDetails';
import { ProfileDetails } from '../../../components/ProfileDetails/ProfileDetails';
import { Reviews } from '../../../components/Reviews/Reviews';

const DoctorProfile = (props) => {
  const { slug: profileId } = props.match.params;

  const {
    loaderState: [pageLoading],
    profileState: [currentProfile],
    clinicState: [clinics],
    timeSlotState: [currentSlot, setCurrentSlot],
    fetchProfileById,
  } = useContext(ProfileContext);

  useEffect(() => {
    fetchProfileById(profileId);
    setCurrentSlot(null);
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={7}>
        <Profile profile={currentProfile} isLoading={pageLoading} />
        <ProfileDetails isLoading={pageLoading} />
        <Reviews />
      </Grid>
      <Grid item xs={12} md={5}>
        <ClinicDetails inGroup={false} clinics={clinics} isLoading={pageLoading} />
      </Grid>
    </Grid>
  );
};

// eslint-disable-next-line import/no-default-export
export default DoctorProfile;
