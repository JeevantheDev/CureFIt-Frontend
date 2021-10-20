import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { USER_TYPE } from '../../app/entity/constant';
import { withUserType } from '../../app/hoc/withUserType';
import { PRIVATE_APPLICATION_URL } from '../../app/router/ApplicationRoutes';
import UpdateInfo from '../../components/UpdateInfo/UpdateInfo';
import Dashboard from './modules/Dashboard';
import Orders from './modules/Orders';
import Appointments from './modules/Appointments';
import Doctors from './modules/Doctors';

const UserScreen = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Redirect exact from={path} to={PRIVATE_APPLICATION_URL.PRIVATE_USER_DASHBOARD} />
      <Route exact path={PRIVATE_APPLICATION_URL.PRIVATE_USER_DASHBOARD} component={Dashboard} />
      <Route exact path={PRIVATE_APPLICATION_URL.PRIVATE_USER_ORDERS} component={Orders} />
      <Route exact path={PRIVATE_APPLICATION_URL.PRIVATE_USER_APPOINTMENTS} component={Appointments} />
      <Route exact path={PRIVATE_APPLICATION_URL.PRIVATE_USER_DOCTORS} component={Doctors} />
      <Route
        exact
        path={PRIVATE_APPLICATION_URL.PRIVATE_UPDATE_ACCOUNT.replace('/private', path)}
        component={UpdateInfo}
      />
      {/* <Redirect to={PRIVATE_APPLICATION_URL.PRIVATE_USER_DASHBOARD} /> */}
    </Switch>
  );
};

// eslint-disable-next-line import/no-default-export
export default withUserType(UserScreen)(USER_TYPE.USER);
