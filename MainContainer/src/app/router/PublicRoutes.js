import { Container } from '@material-ui/core';
import React, { lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { CONTAINER_ROUTES } from './ApplicationRoutes';

const PublicContainerLazy = lazy(() => import('../../screens/publicContainerScreen/PublicContainerScreen'));
const AuthContainerLazy = lazy(() => import('../../screens/authContainerScreen/AuthContainerScreen'));

export const PublicRoutes = ({ isUserValid }) => {
  return (
    <Container>
      <Switch>
        <Route path={CONTAINER_ROUTES.AUTH_CONTAINER}>
          {isUserValid && <Redirect to={CONTAINER_ROUTES.PUBLIC_CONTAINER} />}
          <AuthContainerLazy />
        </Route>
        <Route path={CONTAINER_ROUTES.PUBLIC_CONTAINER} component={PublicContainerLazy} />
      </Switch>
    </Container>
  );
};
