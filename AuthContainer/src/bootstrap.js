import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory, createMemoryHistory } from 'history';
import AuthProvider from './app/context/auth.context';
import App from './app/App';

const mount = (el, { onCompleteAuth, onNavigate, defaultHistory, initialPath }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  onNavigate && history.listen(onNavigate);

  ReactDOM.render(
    <AuthProvider value={{ onCompleteAuth }}>
      <App history={history} />
    </AuthProvider>,
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

// If we are in development all mounts immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_auth_container-dev-root');

  if (devRoot) {
    mount(devRoot, {
      defaultHistory: createBrowserHistory(),
    });
  }
}

// We are running through main container
// we should export the mount
export { mount };
