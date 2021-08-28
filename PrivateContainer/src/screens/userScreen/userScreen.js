import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { PRIVATE_APPLICATION_URL } from '../../app/router/ApplicationRoutes';
import { withUserType } from '../../app/hoc/withUserType';
import { USER_TYPE } from '../../app/entity/constant';

import Dashboard from './modules/Dashboard';
import UpdateInfo from '../../components/UpdateInfo/UpdateInfo';

const UserScreen = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Redirect exact from={path} to={PRIVATE_APPLICATION_URL.PRIVATE_USER_DASHBOARD} />
      <Route exact path={PRIVATE_APPLICATION_URL.PRIVATE_USER_DASHBOARD} component={Dashboard} />
      <Route
        exact
        path={PRIVATE_APPLICATION_URL.PRIVATE_UPDATE_ACCOUNT.replace('/private', path)}
        component={UpdateInfo}
      />
      <Redirect to={PRIVATE_APPLICATION_URL.PRIVATE_USER_DASHBOARD} />
    </Switch>
  );
};

// eslint-disable-next-line import/no-default-export
export default withUserType(UserScreen)(USER_TYPE.USER);
