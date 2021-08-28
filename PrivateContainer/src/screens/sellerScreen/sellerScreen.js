import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { USER_TYPE } from '../../app/entity/constant';
import { withUserType } from '../../app/hoc/withUserType';
import { PRIVATE_APPLICATION_URL } from '../../app/router/ApplicationRoutes';

import Dashboard from './modules/Dashboard';
import UpdateInfo from '../../components/UpdateInfo/UpdateInfo';

const SellerScreen = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Redirect exact from={path} to={PRIVATE_APPLICATION_URL.PRIVATE_SELLER_DASHBOARD} />
      <Route exact path={PRIVATE_APPLICATION_URL.PRIVATE_SELLER_DASHBOARD} component={Dashboard} />
      <Route
        exact
        path={PRIVATE_APPLICATION_URL.PRIVATE_UPDATE_ACCOUNT.replace('/private', path)}
        component={UpdateInfo}
      />
      {/* <Redirect to={PRIVATE_APPLICATION_URL.PRIVATE_SELLER_DASHBOARD} /> */}
    </Switch>
  );
};

// eslint-disable-next-line import/no-default-export
export default withUserType(SellerScreen)(USER_TYPE.SELLER);
