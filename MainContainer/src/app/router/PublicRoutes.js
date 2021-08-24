import React, { lazy } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import { FilterHeader } from '../../components/FilterHeader/FilterHeader';
import { CONTAINER_ROUTES } from './ApplicationRoutes';

const PublicContainerLazy = lazy(() => import('../../screens/publicContainerScreen/PublicContainerScreen'));

export const PublicRoutes = () => {
  const history = useHistory();
  return (
    <div>
      <FilterHeader history={history} />
      <Switch>
        <Route path={CONTAINER_ROUTES.PUBLIC_CONTAINER} component={PublicContainerLazy} />
        <Redirect to={CONTAINER_ROUTES.PUBLIC_CONTAINER} />
      </Switch>
    </div>
  );
};
