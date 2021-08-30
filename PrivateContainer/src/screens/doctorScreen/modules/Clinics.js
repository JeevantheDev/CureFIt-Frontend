import React, { useContext, useEffect } from 'react';
import { ProfileContext } from '../../profileScreen/context/profile.context';
import { ServiceHeader } from '../../../components/shared/ServiceHeader/ServiceHeader';
import { ClinicDetails } from '../../../components/ClinicDetails/ClinicDetails';
import { AppContext } from '../../../app/context/app.context';

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
    fetchProfileById(currentAuthUser.profile.id);
  }, []);

  return (
    <div>
      <ServiceHeader title="Your Clinic Details" />
      <ClinicDetails isEdit={true} clinics={clinics} isLoading={pageLoading} />
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default Clinics;
