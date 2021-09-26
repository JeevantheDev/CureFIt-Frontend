import { Container } from '@material-ui/core';
import React, { lazy, useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AuthContext } from '../../screens/authContainerScreen/context/auth.context';
import { CONTAINER_ROUTES } from './ApplicationRoutes';

const PublicContainerLazy = lazy(() => import('../../screens/publicContainerScreen/PublicContainerScreen'));
const AuthContainerLazy = lazy(() => import('../../screens/authContainerScreen/AuthContainerScreen'));

export const PublicRoutes = ({ isUserValid }) => {
  const {
    urlState: [returnUrl],
  } = useContext(AuthContext);
  return (
    <Switch>
      <Route path={CONTAINER_ROUTES.AUTH_CONTAINER}>
        {isUserValid && <Redirect to={returnUrl} />}
        <AuthContainerLazy />
      </Route>
      <Route path={CONTAINER_ROUTES.PUBLIC_CONTAINER} component={PublicContainerLazy} />
    </Switch>
  );
};
