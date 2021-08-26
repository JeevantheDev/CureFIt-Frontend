import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { PUBLIC_APPLICATION_URL } from './ApplicationRoutes';

import LandingScreen from '../../screens/landingScreen/LandingScreen';
import ProfilesScreen from '../../screens/profileScreen/profileScreen';

export const PublicRoutes = () => {
  return (
    <Switch>
      <Route path={PUBLIC_APPLICATION_URL.PUBLIC_PROFILES} component={ProfilesScreen} />
      <Route path={PUBLIC_APPLICATION_URL.PUBLIC} component={LandingScreen} />
      {/* <Redirect to={PUBLIC_APPLICATION_URL.PUBLIC} /> */}
    </Switch>
  );
};
