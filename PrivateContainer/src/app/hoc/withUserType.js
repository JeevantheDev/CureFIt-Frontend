import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { PRIVATE_APPLICATION_URL } from '../router/ApplicationRoutes';
import { USER_TYPE } from '../entity/constant';

export const withUserType = (Component) => (role) => {
  return (props) => {
    const [redirectPath, setRedirectPath] = useState('');

    const currentUserType = () => {
      const userType = JSON.parse(localStorage.getItem('loggedInUser'))?.user_type;
      return userType;
    };

    useEffect(() => {
      if (role && currentUserType() === USER_TYPE.ADMIN) {
        setRedirectPath(PRIVATE_APPLICATION_URL.PRIVATE_ADMIN);
      } else if (role && currentUserType() === USER_TYPE.DOCTOR) {
        setRedirectPath(PRIVATE_APPLICATION_URL.PRIVATE_DOCTOR_DASHBOARD);
      } else if (role && currentUserType() === USER_TYPE.SELLER) {
        setRedirectPath(PRIVATE_APPLICATION_URL.PRIVATE_SELLER);
      } else if (role && currentUserType() === USER_TYPE.USER) {
        setRedirectPath(PRIVATE_APPLICATION_URL.PRIVATE_USER);
      } else {
        setRedirectPath(PRIVATE_APPLICATION_URL.AUTH_SIGNIN_CONTAINER);
      }
    }, [currentUserType()]);

    if (!role) {
      return <Redirect to={redirectPath} />;
    } else if (role !== currentUserType()) {
      return <Redirect to={redirectPath} />;
    } else {
      return <Component {...props} />;
    }
  };
};
