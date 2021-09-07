import { createBrowserHistory, createMemoryHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/App';
import AppProvider from './app/context/app.context';
import FormProvider from './app/context/form.context';
import ProfileProvider from './screens/profileScreen/context/profile.context';

const mount = (el, { onNavigate, defaultHistory, initialPath, isUserAuth }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });
  onNavigate && history.listen(onNavigate);

  ReactDOM.render(
    <FormProvider>
      <AppProvider>
        <ProfileProvider>
          <App isUserAuth={isUserAuth} history={history} />
        </ProfileProvider>
      </AppProvider>
    </FormProvider>,
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
  const devRoot = document.querySelector('#_private_container-dev-root');

  if (devRoot) {
    mount(devRoot, {
      defaultHistory: createBrowserHistory(),
    });
  }
}

// We are running through main container
// we should export the mount
export { mount };
