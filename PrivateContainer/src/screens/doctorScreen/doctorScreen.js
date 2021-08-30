import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { USER_TYPE } from '../../app/entity/constant';
import { withUserType } from '../../app/hoc/withUserType';
import { PRIVATE_APPLICATION_URL } from '../../app/router/ApplicationRoutes';
import UpdateInfo from '../../components/UpdateInfo/UpdateInfo';

import Dashboard from './modules/Dashboard';
import Profile from './modules/Profile';
import Clinics from './modules/Clinics';

const DoctorScreen = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Redirect exact from={path} to={PRIVATE_APPLICATION_URL.PRIVATE_DOCTOR_DASHBOARD} />
      <Route exact path={PRIVATE_APPLICATION_URL.PRIVATE_DOCTOR_DASHBOARD} component={Dashboard} />
      <Route
        exact
        path={PRIVATE_APPLICATION_URL.PRIVATE_UPDATE_ACCOUNT.replace('/private', path)}
        component={UpdateInfo}
      />
      <Route exact path={PRIVATE_APPLICATION_URL.PRIVATE_DOCTOR_PROFILE} component={Profile} />
      <Route exact path={PRIVATE_APPLICATION_URL.PRIVATE_DOCTOR_CLINICS} component={Clinics} />
      <Redirect to={PRIVATE_APPLICATION_URL.PRIVATE_DOCTOR_DASHBOARD} />
    </Switch>
  );
};

// eslint-disable-next-line import/no-default-export
export default withUserType(DoctorScreen)(USER_TYPE.DOCTOR);
