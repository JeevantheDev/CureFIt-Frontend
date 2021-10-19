import React from 'react';
import { Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName, ThemeProvider } from '@material-ui/core/styles';
import themeProduct from './utils/themeProduct';
import { CssBaseline } from '@material-ui/core';
import { ProductRoutes } from './router/ProductRoutes';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const generateClassName = createGenerateClassName({
  productionPrefix: 'pro',
  disableGlobal: true,
});

const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

const App = ({ history }) => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={themeProduct}>
        <CssBaseline />
        <Router history={history}>
          <Elements stripe={stripePromise}>
            <ProductRoutes />
          </Elements>
        </Router>
      </ThemeProvider>
    </StylesProvider>
  );
};

// eslint-disable-next-line import/no-default-export
export default App;
