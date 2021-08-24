import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { PRIVATE_APPLICATION_URL } from '../../app/router/ApplicationRoutes';
import { DoctorProfile } from './modules/DoctorProfile';

const ProfileScreen = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      {/* <Redirect exact from={path} to={PRIVATE_APPLICATION_URL.PROFILE_SLUG} /> */}
      <Route exact path={PRIVATE_APPLICATION_URL.PROFILE_SLUG} component={DoctorProfile} />
      {/* <Redirect to={PRIVATE_APPLICATION_URL.PROFILE_SLUG} /> */}
    </Switch>
  );
};

// eslint-disable-next-line import/no-default-export
export default ProfileScreen;
