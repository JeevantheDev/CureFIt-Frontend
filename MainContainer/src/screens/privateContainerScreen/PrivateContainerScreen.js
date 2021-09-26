import React, { useRef, useEffect, useContext } from 'react';
import { mount } from 'privateContainer/PrivateContainerApp';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../authContainerScreen/context/auth.context';
import { MainLayout } from '../../components/shared/MainLayout/MainLayout';

const PrivateContainerScreen = () => {
  const ref = useRef(null);

  const history = useHistory();

  const {
    userState: [loggedinUser],
    tokenState: [token],
    urlState: [returnUrl, setReturnUrl],
  } = useContext(AuthContext);

  useEffect(() => {
    mountPrivateContainer();
  }, []);

  const mountPrivateContainer = () => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      isUserAuth: token && loggedinUser ? true : false,
      setReturnUrl,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
    });
    history.listen(onParentNavigate);
  };

  return (
    <MainLayout>
      <div ref={ref} />
    </MainLayout>
  );
};

// eslint-disable-next-line import/no-default-export
export default PrivateContainerScreen;
