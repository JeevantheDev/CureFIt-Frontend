import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { USER_TYPE } from '../../app/entity/constant';
import { withUserType } from '../../app/hoc/withUserType';
import { PRIVATE_APPLICATION_URL } from '../../app/router/ApplicationRoutes';
import UpdateInfo from '../../components/UpdateInfo/UpdateInfo';
import Dashboard from './modules/Dashboard';
import Products from './modules/Products';
import SellerOrders from './modules/SellerOrders';
import Orders from '../userScreen/modules/Orders';
import Appointments from '../userScreen/modules/Appointments';

const SellerScreen = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Redirect exact from={path} to={PRIVATE_APPLICATION_URL.PRIVATE_SELLER_DASHBOARD} />
      <Route exact path={PRIVATE_APPLICATION_URL.PRIVATE_SELLER_DASHBOARD} component={Dashboard} />
      <Route exact path={PRIVATE_APPLICATION_URL.PRIVATE_SELLER_PRODUCTS} component={Products} />
      <Route exact path={PRIVATE_APPLICATION_URL.PRIVATE_SELLER_ORDERS} component={SellerOrders} />
      <Route exact path={PRIVATE_APPLICATION_URL.PRIVATE_SELLER_ORDERS_ME} component={Orders} />
      <Route exact path={PRIVATE_APPLICATION_URL.PRIVATE_SELLER_APPOINTMENTS} component={Appointments} />
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
