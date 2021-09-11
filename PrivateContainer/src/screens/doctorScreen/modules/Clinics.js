import { Box, TextField } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import Search from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import { AppContext } from '../../../app/context/app.context';
import { ClinicDetails } from '../../../components/ClinicDetails/ClinicDetails';
import { ServiceHeader } from '../../../components/shared/ServiceHeader/ServiceHeader';
import { ProfileContext } from '../../profileScreen/context/profile.context';
import { DoctorContext } from '../context/doctor.context';

const Clinics = () => {
  const {
    loaderState: [pageLoading],
    clinicState: [clinics],
  } = useContext(ProfileContext);
  const { getClinicsByDoctorAction } = useContext(DoctorContext);
  const {
    userState: [currentAuthUser],
  } = useContext(AppContext);

  const [clinic_name, setClinicName] = useState('');
  useEffect(() => {
    getClinicsByDoctorAction({ user_id: currentAuthUser._id, clinic_name });
  }, [clinic_name]);

  const handleKeyEnter = (event) => {
    event.preventDefault();
    if (event.key !== 'Enter') return;
    setClinicName(event.target.value);
  };

  return (
    <div>
      <ServiceHeader title="Your Clinic Details">
        <Box>
          <TextField
            variant="outlined"
            color="secondary"
            size="small"
            placeholder="Search name"
            name="search"
            onKeyUp={handleKeyEnter}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="secondary" />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </ServiceHeader>
      <ClinicDetails isEdit={true} clinics={clinics || []} isLoading={pageLoading} />
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default Clinics;
