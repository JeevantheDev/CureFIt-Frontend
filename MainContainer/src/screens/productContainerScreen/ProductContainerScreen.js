import React, { useRef, useEffect, useContext } from 'react';
import { mount } from 'productContainer/ProductContainerApp';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../authContainerScreen/context/auth.context';

const ProductContainerScreen = () => {
  const ref = useRef(null);
  const {
    userState: [loggedinUser],
    tokenState: [token],
  } = useContext(AuthContext);

  const history = useHistory();

  useEffect(() => {
    mountProductContainer();
  }, []);

  const mountProductContainer = () => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      authUser: { ...loggedinUser, token },
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
