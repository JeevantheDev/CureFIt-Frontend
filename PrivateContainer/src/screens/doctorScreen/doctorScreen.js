import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { USER_TYPE } from '../../app/entity/constant';
import { withUserType } from '../../app/hoc/withUserType';
import { PRIVATE_APPLICATION_URL } from '../../app/router/ApplicationRoutes';
import UpdateInfo from '../../components/UpdateInfo/UpdateInfo';
import Appointments from './modules/Appointments';
import Clinics from './modules/Clinics';
import Dashboard from './modules/Dashboard';
import MyAppointments from './modules/MyAppointments';
import Patients from './modules/Patients';
import Profile from './modules/Profile';

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
      <Route exact path={PRIVATE_APPLICATION_URL.PRIVATE_DOCTOR_APPOINTMENTS} component={Appointments} />
      <Route exact path={PRIVATE_APPLICATION_URL.PRIVATE_DOCTOR_PATIENTS} component={Patients} />
      <Route exact path={PRIVATE_APPLICATION_URL.PRIVATE_DOCTOR_APPOINTMENTS_ME} component={MyAppointments} />
      {/* <Redirect to={PRIVATE_APPLICATION_URL.PRIVATE_DOCTOR_DASHBOARD} /> */}
    </Switch>
  );
};

// eslint-disable-next-line import/no-default-export
export default withUserType(DoctorScreen)(USER_TYPE.DOCTOR);
