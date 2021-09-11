import React, { useRef, useEffect, useContext } from 'react';
import { mount } from 'authContainer/AuthContainerApp';
import { useHistory } from 'react-router-dom';
import { AuthContext } from './context/auth.context';
const AuthContainerScreen = () => {
  const ref = useRef(null);
  const {
    tokenState: [token, setToken],
    urlState: [returnUrl],
  } = useContext(AuthContext);

  const history = useHistory();

  useEffect(() => {
    mountAuthContainer();
  }, []);

  const onCompleteAuth = (res) => {
    res.token && setToken(res.token);
  };

  const mountAuthContainer = () => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      returnUrl: returnUrl,
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
      onCompleteAuth: (res) => {
        onCompleteAuth(res);
      },
    });
    history.listen(onParentNavigate);
  };

  return <div ref={ref} />;
};

// eslint-disable-next-line import/no-default-export
export default AuthContainerScreen;
