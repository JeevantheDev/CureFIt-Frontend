import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AdminScreen from '../../screens/adminScreen/adminScreen';
import DoctorScreen from '../../screens/doctorScreen/doctorScreen';
import SellerScreen from '../../screens/sellerScreen/sellerScreen';
import UserScreen from '../../screens/userScreen/userScreen';
import { PRIVATE_APPLICATION_URL } from './ApplicationRoutes';

export const PrivateRoutes = () => {
  return (
    <Switch>
      <Route path={PRIVATE_APPLICATION_URL.PRIVATE_ADMIN} component={AdminScreen} />
      <Route path={PRIVATE_APPLICATION_URL.PRIVATE_DOCTOR} component={DoctorScreen} />
      <Route path={PRIVATE_APPLICATION_URL.PRIVATE_SELLER} component={SellerScreen} />
      <Route path={PRIVATE_APPLICATION_URL.PRIVATE_USER} component={UserScreen} />
    </Switch>
  );
};
