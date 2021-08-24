import React, { Suspense } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { StylesProvider, createGenerateClassName, ThemeProvider } from '@material-ui/core/styles';
import { Header } from '../components/Header/Header';
import theme from './utils/theme';
import { PublicRoutes } from './router/PublicRoutes';
import '../index.css';
import { Container, CssBaseline } from '@material-ui/core';
import AppProvider from './app.context';
import { Progress } from '../components/shared/Progress';

const generateClassName = createGenerateClassName({
  productionPrefix: 'co',
  disableGlobal: true,
});

const history = createBrowserHistory();

const App = () => {
  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <AppProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Suspense fallback={<Progress />}>
              <Container>
                <PublicRoutes />
              </Container>
            </Suspense>
          </ThemeProvider>
        </AppProvider>
      </StylesProvider>
    </Router>
  );
};

// eslint-disable-next-line import/no-default-export
export default App;
