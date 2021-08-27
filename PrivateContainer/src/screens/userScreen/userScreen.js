import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { PRIVATE_APPLICATION_URL } from '../../app/router/ApplicationRoutes';

import Dashboard from './modules/Dashboard';

const UserScreen = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Redirect exact from={path} to={PRIVATE_APPLICATION_URL.PRIVATE_USER_DASHBOARD} />
      <Route exact path={PRIVATE_APPLICATION_URL.PRIVATE_USER_DASHBOARD} component={Dashboard} />
      <Redirect to={PRIVATE_APPLICATION_URL.PRIVATE_USER_DASHBOARD} />
    </Switch>
  );
};

// eslint-disable-next-line import/no-default-export
export default UserScreen;