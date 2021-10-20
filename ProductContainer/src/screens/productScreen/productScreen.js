import { Container } from '@material-ui/core';
import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';

import { PRODUCT_APPLICATION_URL } from '../../app/router/ApplicationRoutes';
import Product from './modules/Product';
import Products from './modules/Products';

const ProductScreen = () => {
  const { path } = useRouteMatch();

  return (
    <Container>
      <Switch>
        {/* <Redirect exact from={path} to={PRODUCT_APPLICATION_URL.PRODUCT_LIST_ALL} /> */}
        <Route exact path={PRODUCT_APPLICATION_URL.PRODUCT_LIST_ALL} component={Products} />
        <Route exact path={PRODUCT_APPLICATION_URL.PRODUCT_LIST_SLUG} component={Product} />
        {/* <Redirect to={PRODUCT_APPLICATION_URL.PRODUCT_LIST_ALL} /> */}
      </Switch>
    </Container>
  );
};

// eslint-disable-next-line import/no-default-export
export default ProductScreen;
