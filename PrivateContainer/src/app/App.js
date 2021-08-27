import React from 'react';
import { Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName, ThemeProvider } from '@material-ui/core/styles';
import { PublicRoutes } from './router/PublicRoutes';
import { PrivateRoutes } from './router/PrivateRoutes';
import themePrivate from './utils/themePrivate';
import { CssBaseline } from '@material-ui/core';

const generateClassName = createGenerateClassName({
  productionPrefix: 'pr',
  disableGlobal: true,
});

const App = ({ history, isUserAuth }) => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={themePrivate}>
        <CssBaseline />
        <Router history={history}>
          <PublicRoutes />
          {isUserAuth && <PrivateRoutes />}
        </Router>
      </ThemeProvider>
    </StylesProvider>
  );
};

// eslint-disable-next-line import/no-default-export
export default App;
