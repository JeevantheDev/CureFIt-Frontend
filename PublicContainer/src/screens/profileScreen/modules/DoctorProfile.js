import React, { useRef, useEffect, useContext } from 'react';
import { mount } from 'privateContainer/PrivateContainerApp';
import { useHistory } from 'react-router-dom';
import { ProfileContext } from '../context/profile.context';
const DoctorProfile = () => {
  const ref = useRef(null);
  const { isUserAuth, returnUrl, setReturnUrl } = useContext(ProfileContext);
  const history = useHistory();

  useEffect(() => {
    mountPrivateContainer();
  }, []);

  const mountPrivateContainer = () => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      isUserAuth: isUserAuth,
      returnUrl,
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

  return <div ref={ref} />;
};

// eslint-disable-next-line import/no-default-export
export default DoctorProfile;
