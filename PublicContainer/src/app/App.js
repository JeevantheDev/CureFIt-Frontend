import React from 'react';
import { Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName, ThemeProvider } from '@material-ui/core/styles';
import { PublicRoutes } from './router/PublicRoutes';
import themePublic from './utils/themePublic';
import { CssBaseline } from '@material-ui/core';

const generateClassName = createGenerateClassName({
  productionPrefix: 'pu',
  disableGlobal: true,
});

const App = ({ history }) => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <ThemeProvider theme={themePublic}>
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
