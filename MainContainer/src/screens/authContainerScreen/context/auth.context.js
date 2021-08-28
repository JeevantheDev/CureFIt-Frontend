import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { userRedirect } from '../../../app/api/auth.api';
import { ROLES, SIDEBAR_PANELS } from '../../../app/entity/constant';

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
  const [sidebarPanel, setSidebarPanel] = useState([]);

  const userRedirectAction = async () => {
    const res = await userRedirect();
    res.data ? setLoggedinUser(res.data) : setAuthError(res.error);
    setSidebarPanel(SIDEBAR_PANELS[ROLES[res.data.user_type]]);
    setIsAuthenticating(false);
  };

  const signout = () => {
    localStorage.clear();
    setToken(null);
    setLoggedinUser({});
    setSidebarPanel([]);
    setIsAuthenticating(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthState: [isAuthenticating, setIsAuthenticating],
        errorState: [authError, setAuthError],
        userState: [loggedinUser, setLoggedinUser],
        tokenState: [token, setToken],
        sidebarState: [sidebarPanel],
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
