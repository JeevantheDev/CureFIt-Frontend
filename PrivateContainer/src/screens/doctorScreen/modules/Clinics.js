import React, { useContext, useEffect } from 'react';

import { AppContext } from '../../../app/context/app.context';
import { ClinicDetails } from '../../../components/ClinicDetails/ClinicDetails';
import { ServiceHeader } from '../../../components/shared/ServiceHeader/ServiceHeader';
import { ProfileContext } from '../../profileScreen/context/profile.context';

const Clinics = () => {
  const {
    loaderState: [pageLoading],
    clinicState: [clinics],
    fetchProfileById,
  } = useContext(ProfileContext);

  const {
    userState: [currentAuthUser],
  } = useContext(AppContext);

  useEffect(() => {
    currentAuthUser.profile && fetchProfileById(currentAuthUser.profile.id);
  }, []);

  return (
    <div>
      <ServiceHeader title="Your Clinic Details" />
      <ClinicDetails isEdit={true} clinics={clinics || []} isLoading={pageLoading} />
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default Clinics;
