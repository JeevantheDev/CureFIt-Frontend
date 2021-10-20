import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory, createMemoryHistory } from 'history';
import App from './app/App';
import FormProvider from './app/context/form.context';
import AppProvider from './app/context/app.context';
import ProductProvider from './screens/productScreen/context/product.context';
import CheckoutProvider from './screens/checkoutScreen/context/checkout.context';

const mount = (el, { onNavigate, defaultHistory, initialPath, publicFilterQuery, returnUrl, setReturnUrl }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  onNavigate && history.listen(onNavigate);

  ReactDOM.render(
    <AppProvider value={{ publicFilterQuery, returnUrl, setReturnUrl }}>
      <FormProvider>
        <ProductProvider>
          <CheckoutProvider>
            <App history={history} />
          </CheckoutProvider>
        </ProductProvider>
      </FormProvider>
    </AppProvider>,
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
  const devRoot = document.querySelector('#_product_container-dev-root');

  if (devRoot) {
    mount(devRoot, {
      defaultHistory: createBrowserHistory(),
    });
  }
}

// We are running through main container
// we should export the mount
export { mount };
