import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { CONTAINER_ROUTES } from './ApplicationRoutes';

const PublicContainerLazy = lazy(() => import('../../screens/publicContainerScreen/PublicContainerScreen'));
const AuthContainerLazy = lazy(() => import('../../screens/authContainerScreen/AuthContainerScreen'));

export const PublicRoutes = () => {
  return (
    <div>
      <Switch>
        <Route path={CONTAINER_ROUTES.AUTH_CONTAINER} component={AuthContainerLazy} />
        <Route path={CONTAINER_ROUTES.PUBLIC_CONTAINER} component={PublicContainerLazy} />
        {/* <Redirect to={CONTAINER_ROUTES.PUBLIC_CONTAINER} /> */}
      </Switch>
    </div>
  );
};
