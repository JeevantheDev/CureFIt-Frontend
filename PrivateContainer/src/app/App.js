import React, { useContext, useEffect } from 'react';
import { Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName, ThemeProvider } from '@material-ui/core/styles';
import { PublicRoutes } from './router/PublicRoutes';
import { PrivateRoutes } from './router/PrivateRoutes';
import themePrivate from './utils/themePrivate';
import { CssBaseline } from '@material-ui/core';
import { AppContext } from './context/app.context';
import DoctorProvider from '../screens/doctorScreen/context/doctor.context';

const generateClassName = createGenerateClassName({
  productionPrefix: 'pr',
  disableGlobal: true,
});

const App = ({ history, isUserAuth }) => {
  const {
    tokenState: [currentToken],
  } = useContext(AppContext);

  useEffect(() => {
    if (currentToken) localStorage.setItem('sessionToken', currentToken);
  }, [currentToken]);

  return (
    <DoctorProvider>
      <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider theme={themePrivate}>
          <CssBaseline />
          <Router history={history}>
            <PublicRoutes />
            {isUserAuth && <PrivateRoutes />}
          </Router>
        </ThemeProvider>
      </StylesProvider>
    </DoctorProvider>
  );
};

// eslint-disable-next-line import/no-default-export
export default App;
