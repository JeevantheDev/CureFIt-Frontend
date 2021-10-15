import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { PRODUCT_APPLICATION_URL } from './ApplicationRoutes';

import ProductScreen from '../../screens/productScreen/productScreen';
import { ProductHeader } from '../../components/ProductHeader/ProductHeader';

export const ProductRoutes = () => {
  return (
    <>
      <ProductHeader />
      <Switch>
        <Route path={PRODUCT_APPLICATION_URL.PRODUCT_CONTAINER} component={ProductScreen} />
        {/* <Route exact path={PRODUCT_APPLICATION_URL.PRODUCT_CONTAINER_SLUG} component={LandingScreen} /> */}
        {/* <Redirect to={PRODUCT_APPLICATION_URL.PUBLIC} /> */}
      </Switch>
    </>
  );
};
