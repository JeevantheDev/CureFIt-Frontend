import React, { Suspense, useContext, useEffect, useState } from 'react';
import { Redirect, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { StylesProvider, createGenerateClassName, ThemeProvider } from '@material-ui/core/styles';
import { Header } from '../components/Header/Header';
import theme from './utils/theme';
import { PublicRoutes } from './router/PublicRoutes';
import '../index.css';
import { CssBaseline } from '@material-ui/core';
import { Progress } from '../components/shared/Progress';
import { AuthContext } from '../screens/authContainerScreen/context/auth.context';
import { PrivateRoutes } from './router/PrivateRoutes';
import { CONTAINER_ROUTES } from './router/ApplicationRoutes';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
  disableGlobal: true,
});

const history = createBrowserHistory();

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
  },
}));

const App = () => {
  const {
    isAuthState: [isAuthenticating],
    userState: [loggedinUser],
    tokenState: [token],
    urlState: [returnUrl],
    userRedirectAction,
    signout,
  } = useContext(AuthContext);
  const classes = useStyles();

  const [isUserValid, setIsUserValid] = useState(false);

  useEffect(() => {
    localStorage.setItem('loggedInUser', JSON.stringify(loggedinUser));
    if (token) localStorage.setItem('sessionToken', token);
    const isValid = token && loggedinUser?.user_type ? true : false;
    setIsUserValid(isValid);
  }, [token, loggedinUser]);

  useEffect(() => {
    if (token) {
      userRedirectAction();
    } else {
      signout();
    }
  }, [token]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header />
          <Suspense fallback={<Progress />}>
            {isAuthenticating ? (
              <p>Please wait..</p>
            ) : (
              <main className={classes.content}>
                <div className={classes.toolbar} />
                <PublicRoutes isUserValid={isUserValid} />
                {!isUserValid && <Redirect to={CONTAINER_ROUTES.PUBLIC_CONTAINER} />}
                <PrivateRoutes />
              </main>
            )}
          </Suspense>
        </ThemeProvider>
      </StylesProvider>
    </Router>
  );
};

// eslint-disable-next-line import/no-default-export
export default App;
