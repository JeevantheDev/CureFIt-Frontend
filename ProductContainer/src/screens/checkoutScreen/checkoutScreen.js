import { Container } from '@material-ui/core';
import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { PRODUCT_APPLICATION_URL } from '../../app/router/ApplicationRoutes';
import Cart from './modules/Cart';

const CheckoutScreen = () => {
  const { path } = useRouteMatch();
  return (
    <Container>
      <Switch>
        <Redirect exact from={path} to={PRODUCT_APPLICATION_URL.PRODUCT_CHECKOUT_CART} />
        <Route exact path={PRODUCT_APPLICATION_URL.PRODUCT_CHECKOUT_CART} component={Cart} />
        {/* <Route path={PRODUCT_APPLICATION_URL.PRODUCT_CONTAINER_SLUG} component={Product} /> */}
        {/* <Redirect to={PRODUCT_APPLICATION_URL.PRODUCT_CHECKOUT_CART} /> */}
      </Switch>
    </Container>
  );
};

// eslint-disable-next-line import/no-default-export
export default CheckoutScreen;
