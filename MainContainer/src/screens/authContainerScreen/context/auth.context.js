import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { userRedirect } from '../../../app/api/auth.api';

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [authError, setAuthError] = useState('');
  const [loggedinUser, setLoggedinUser] = useState(
    localStorage.getItem('loggedInUser') ? JSON.parse(localStorage.getItem('loggedInUser') || '{}') : {}
  );
  const [token, setToken] = useState(
    localStorage.getItem('sessionToken') ? localStorage.getItem('sessionToken') : null
  );

  const userRedirectAction = async () => {
    const res = await userRedirect();
    res.data ? setLoggedinUser(res.data) : setAuthError(res.error);
    setIsAuthenticating(false);
  };

  const signout = () => {
    localStorage.clear();
    setToken(null);
    setLoggedinUser({});
    setIsAuthenticating(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthState: [isAuthenticating, setIsAuthenticating],
        errorState: [authError, setAuthError],
        userState: [loggedinUser, setLoggedinUser],
        tokenState: [token, setToken],
        userRedirectAction,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line import/no-default-export
export default AuthProvider;
