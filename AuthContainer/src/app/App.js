import React from 'react';
import { Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName, ThemeProvider } from '@material-ui/core/styles';
import themeAuth from './utils/themeAuth';
import { CssBaseline } from '@material-ui/core';
import { PublicRoutes } from './router/PublicRoutes';

const generateClassName = createGenerateClassName({
  productionPrefix: 'au',
});

const App = ({ history }) => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={themeAuth}>
        <CssBaseline />
        <Router history={history}>
          <PublicRoutes />
        </Router>
      </ThemeProvider>
    </StylesProvider>
  );
};

// eslint-disable-next-line import/no-default-export
export default App;
