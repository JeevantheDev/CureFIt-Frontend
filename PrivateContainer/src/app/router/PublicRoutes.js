import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { PRIVATE_APPLICATION_URL } from './ApplicationRoutes';
import ProfileScreen from '../../screens/profileScreen/profileScreen';

export const PublicRoutes = () => {
  return (
    <Switch>
      <Route exact path={PRIVATE_APPLICATION_URL.PROFILE} component={ProfileScreen} />
      <Route path={PRIVATE_APPLICATION_URL.PROFILE} component={ProfileScreen} />
      {/* <Redirect to={PRIVATE_APPLICATION_URL.PROFILE} /> */}
    </Switch>
  );
};
