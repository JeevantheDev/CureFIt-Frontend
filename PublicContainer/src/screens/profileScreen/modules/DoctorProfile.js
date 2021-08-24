import React, { useRef, useEffect } from 'react';
import { mount } from 'privateContainer/PrivateContainerApp';
import { useHistory } from 'react-router-dom';
const DoctorProfile = () => {
  const ref = useRef(null);

  const history = useHistory();

  useEffect(() => {
    mountPrivateContainer();
  }, []);

  const mountPrivateContainer = () => {
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
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
