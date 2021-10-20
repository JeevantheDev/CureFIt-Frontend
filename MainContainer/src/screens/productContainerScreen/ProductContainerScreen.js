import React, { useRef, useEffect, useContext } from 'react';
import { mount } from 'productContainer/ProductContainerApp';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../authContainerScreen/context/auth.context';
import { AppContext } from '../../app/app.context';
import { CONTAINER_ROUTES } from '../../app/router/ApplicationRoutes';

const ProductContainerScreen = () => {
  const ref = useRef(null);
  const {
    userState: [loggedinUser],
    tokenState: [token],
    urlState: [returnUrl, setReturnUrl],
  } = useContext(AuthContext);

  const {
    filterState: [publicFilterQuery],
  } = useContext(AppContext);

  const history = useHistory();

  useEffect(() => {
    if (publicFilterQuery.specalists) return;
    // history.push(CONTAINER_ROUTES.PRODUCT_CHECKOUT_ALL);
    mountProductContainer();
  }, []);

  const mountProductContainer = () => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      authUser: { ...loggedinUser, token },
      returnUrl,
      setReturnUrl,
      publicFilterQuery,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;
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
export default ProductContainerScreen;
