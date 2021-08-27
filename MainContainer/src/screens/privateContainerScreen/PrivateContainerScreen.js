import React, { useRef, useEffect, useContext } from 'react';
import { mount } from 'privateContainer/PrivateContainerApp';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../authContainerScreen/context/auth.context';

const PrivateContainerScreen = () => {
  const ref = useRef(null);

  const history = useHistory();

  const {
    userState: [loggedinUser],
    tokenState: [token],
  } = useContext(AuthContext);

  useEffect(() => {
    mountPrivateContainer();
  }, []);

  const mountPrivateContainer = () => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      isUserAuth: token && loggedinUser ? true : false,
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
    <>
      <div ref={ref} />
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default PrivateContainerScreen;
