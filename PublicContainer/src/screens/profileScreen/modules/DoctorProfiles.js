import React, { useContext, useEffect } from 'react';
import { ProfileContext } from '../context/profile.context';
import { Profiles } from 'curefit';
import { ServiceTitle } from '../../../components/ServiceTitle/ServiceTitle';
import { useHistory } from 'react-router-dom';
import { SCREEN } from '../../../app/entity/constant';
import { PUBLIC_APPLICATION_URL } from '../../../app/router/ApplicationRoutes';

const DoctorProfiles = () => {
  const {
    filterQuery,
    loaderState: [pageLoading],
    profilesState: [profiles],
    fetchProfiles,
  } = useContext(ProfileContext);

  const history = useHistory();

  useEffect(() => {
    fetchProfiles();
  }, [filterQuery]);

  const proceedProfileAction = (type, profileId) => {
    const ROUTE_TYPE =
      type === SCREEN.VIEW_PROFILE
        ? PUBLIC_APPLICATION_URL.PUBLIC_PROFILES_SLUG
        : PUBLIC_APPLICATION_URL.PUBLIC_PROFILES_SLUG_APPOINTMENT;
    history.push(ROUTE_TYPE.replace(':slug', profileId));
  };

  return (
    <>
      {!pageLoading && (
        <ServiceTitle
          title={`Book from ${profiles.length} doctors
            ${filterQuery.location ? `in ${filterQuery.location}.` : '.'}`}
          subTitle="With predicted wait-time & verified details."
        />
      )}
      <Profiles profileList={profiles} isLoading={pageLoading} handleButtonClick={proceedProfileAction} />
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default DoctorProfiles;
