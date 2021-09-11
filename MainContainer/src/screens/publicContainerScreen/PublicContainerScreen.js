import React, { useRef, useEffect, useContext } from 'react';
import { mount } from 'publicContainer/PublicContainerApp';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../../app/app.context';
import { AuthContext } from '../authContainerScreen/context/auth.context';
import { CONTAINER_ROUTES } from '../../app/router/ApplicationRoutes';
import { FilterHeader } from '../../components/FilterHeader/FilterHeader';
import BreadCrumbHeader from '../../components/shared/BreadCrumbHeader/BreadCrumbHeader';

const PublicContainerScreen = () => {
  const ref = useRef(null);

  const {
    userState: [loggedinUser],
    tokenState: [token],
    urlState: [returnUrl, setReturnUrl],
  } = useContext(AuthContext);

  const {
    routeState: [activeRoute, setActiveRoute],
    filterState: [publicFilterQuery],
  } = useContext(AppContext);

  const history = useHistory();
  useEffect(() => {
    setActiveRoute(history.location.pathname);
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
      isUserAuth: token && loggedinUser ? true : false,
      returnUrl,
      setReturnUrl,
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

  return (
    <>
      {!activeRoute.includes('/private') && <FilterHeader history={history} />}
      <BreadCrumbHeader />
      <div ref={ref} />
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default PublicContainerScreen;
