import React, { useRef, useEffect, useContext } from 'react';
import { mount } from 'publicContainer/PublicContainerApp';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../app/app.context';
import { CONTAINER_ROUTES } from '../../app/router/ApplicationRoutes';

const PublicContainerScreen = () => {
  const ref = useRef(null);

  const {
    routeState: [activeRoute, setActiveRoute],
    filterState: [publicFilterQuery],
  } = useContext(AppContext);

  const history = useHistory();

  useEffect(() => {
    setActiveRoute(
      history.location.pathname === CONTAINER_ROUTES.PUBLIC_CONTAINER_PROFILES
        ? CONTAINER_ROUTES.PUBLIC_CONTAINER_PROFILES
        : '/'
    );
    if (JSON.stringify(publicFilterQuery) !== '{}') {
      history.push({
        pathname: CONTAINER_ROUTES.PUBLIC_CONTAINER_PROFILES,
        search: `?filter=${encodeURIComponent(JSON.stringify(publicFilterQuery))}`,
      });
    }
    mountPublicContainer();
  }, [publicFilterQuery]);

  const mountPublicContainer = () => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      queryParams: history.location.search,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;
        setActiveRoute(pathname);
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
    });
    history.listen(onParentNavigate);
  };

  return <div ref={ref} />;
};

// eslint-disable-next-line import/no-default-export
export default PublicContainerScreen;
