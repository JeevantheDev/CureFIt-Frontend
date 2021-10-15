import React from 'react';
import { Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName, ThemeProvider } from '@material-ui/core/styles';
import themeProduct from './utils/themeProduct';
import { CssBaseline } from '@material-ui/core';
import { ProductRoutes } from './router/ProductRoutes';

const generateClassName = createGenerateClassName({
  productionPrefix: 'pro',
});

const App = ({ history }) => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={themeProduct}>
        <CssBaseline />
        <Router history={history}>
          <ProductRoutes />
        </Router>
      </ThemeProvider>
    </StylesProvider>
  );
};

// eslint-disable-next-line import/no-default-export
export default App;
