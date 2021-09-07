import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { PRIVATE_APPLICATION_URL } from '../../app/router/ApplicationRoutes';
import DoctorAppointment from './modules/DoctorAppointment';
import DoctorProfile from './modules/DoctorProfile';

const ProfileScreen = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      {/* <Redirect exact from={path} to={PRIVATE_APPLICATION_URL.PROFILE_SLUG} /> */}
      <Route exact path={PRIVATE_APPLICATION_URL.PROFILE_SLUG} component={DoctorProfile} />
      <Route exact path={PRIVATE_APPLICATION_URL.PUBLIC_PROFILES_SLUG_APPOINTMENT} component={DoctorAppointment} />
      {/* <Redirect to={PRIVATE_APPLICATION_URL.PROFILE_SLUG} /> */}
    </Switch>
  );
};

// eslint-disable-next-line import/no-default-export
export default ProfileScreen;
