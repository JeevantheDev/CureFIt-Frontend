import { Container } from '@material-ui/core';
import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { PUBLIC_APPLICATION_URL } from '../../app/router/ApplicationRoutes';

import DoctorProfile from './modules/DoctorProfile';
import DoctorProfiles from './modules/DoctorProfiles';

const ProfilesScreen = () => {
  const { path } = useRouteMatch();

  return (
    <Container>
      <Switch>
        <Redirect exact from={path} to={PUBLIC_APPLICATION_URL.PUBLIC_PROFILES_ALL} />
        <Route exact path={PUBLIC_APPLICATION_URL.PUBLIC_PROFILES_ALL} component={DoctorProfiles} />
        <Route path={PUBLIC_APPLICATION_URL.PUBLIC_PROFILES_SLUG} component={DoctorProfile} />
        <Redirect to={PUBLIC_APPLICATION_URL.PUBLIC_PROFILES_ALL} />
      </Switch>
    </Container>
  );
};

// eslint-disable-next-line import/no-default-export
export default ProfilesScreen;
