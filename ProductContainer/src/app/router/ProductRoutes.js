import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ProductHeader } from '../../components/ProductHeader/ProductHeader';
import CheckoutScreen from '../../screens/checkoutScreen/checkoutScreen';
import ProductScreen from '../../screens/productScreen/productScreen';
import { PRODUCT_APPLICATION_URL } from './ApplicationRoutes';

export const ProductRoutes = () => {
  return (
    <>
      <ProductHeader />
      <Switch>
        <Route path={PRODUCT_APPLICATION_URL.PRODUCT_LIST} component={ProductScreen} />
        <Route path={PRODUCT_APPLICATION_URL.PRODUCT_CHECKOUT} component={CheckoutScreen} />
        {/* <Redirect to={PRODUCT_APPLICATION_URL.PUBLIC} /> */}
      </Switch>
    </>
  );
};
