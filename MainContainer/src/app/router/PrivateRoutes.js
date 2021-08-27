import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { CONTAINER_ROUTES } from './ApplicationRoutes';

const PrivateContainerLazy = lazy(() => import('../../screens/privateContainerScreen/PrivateContainerScreen'));

export const PrivateRoutes = () => {
  return (
    <div>
      <Switch>
        <Route path={CONTAINER_ROUTES.PRIVATE_CONTAINER} component={PrivateContainerLazy} />
        {/* <Redirect to={CONTAINER_ROUTES.PUBLIC_CONTAINER} /> */}
      </Switch>
    </div>
  );
};
