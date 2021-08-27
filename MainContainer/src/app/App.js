import React, { Suspense, useContext, useEffect, useState } from 'react';
import { Redirect, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { StylesProvider, createGenerateClassName, ThemeProvider } from '@material-ui/core/styles';
import { Header } from '../components/Header/Header';
import theme from './utils/theme';
import { PublicRoutes } from './router/PublicRoutes';
import '../index.css';
import { Container, CssBaseline } from '@material-ui/core';
import { Progress } from '../components/shared/Progress';
import { AuthContext } from '../screens/authContainerScreen/context/auth.context';
import { PrivateRoutes } from './router/PrivateRoutes';

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
  disableGlobal: true,
});

const history = createBrowserHistory();

const App = () => {
  const {
    isAuthState: [isAuthenticating],
    userState: [loggedinUser],
    tokenState: [token],
    userRedirectAction,
    signout,
  } = useContext(AuthContext);

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
            <Container>
              {isAuthenticating ? (
                <h1>Please wait..</h1>
              ) : (
                <>
                  <PublicRoutes isUserValid={isUserValid} />
                  {!isUserValid && <Redirect to="/" />}
                  <PrivateRoutes />
                </>
              )}
            </Container>
          </Suspense>
        </ThemeProvider>
      </StylesProvider>
    </Router>
  );
};

// eslint-disable-next-line import/no-default-export
export default App;
