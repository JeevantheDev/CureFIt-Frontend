import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory, createMemoryHistory } from 'history';
import ProfileProvider from './screens/profileScreen/context/profile.context';
import App from './app/App';

const mount = (
  el,
  { onNavigate, defaultHistory, initialPath, queryParams, setPublicFilterQuery, isUserAuth, setReturnUrl, returnUrl },
) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  onNavigate && history.listen(onNavigate);

  ReactDOM.render(
    <ProfileProvider
      value={{
        filterQuery: getFilterParams(queryParams) || {},
        setPublicFilterQuery,
        isUserAuth,
        returnUrl,
        setReturnUrl,
      }}
    >
      <App history={history} />
    </ProfileProvider>,
    el,
  );

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

const getFilterParams = (queryParams) => {
  let res = queryParams.match(/[^?filter=]/i);
  if (res) {
    res = queryParams.slice(res.index);
  }
  return JSON.parse(decodeURIComponent(res));
};

// If we are in development all mounts immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_public_container-dev-root');

  if (devRoot) {
    mount(devRoot, {
      defaultHistory: createBrowserHistory(),
      queryParams: createBrowserHistory().location.search,
      setPublicFilterQuery: () => {},
    });
  }
}

// We are running through main container
// we should export the mount
export { mount };
