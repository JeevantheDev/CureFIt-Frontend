import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { updateUserDetails, updateUserPassword } from '../api/shared.api';

export const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [submitLoader, setSubmitLoader] = useState(false);
  const [formError, setFormError] = useState('');
  const [currentAuthUser, setCurrentAuthUser] = useState(
    localStorage.getItem('loggedInUser') ? JSON.parse(localStorage.getItem('loggedInUser') || '{}') : {},
  );
  const [currentToken, setCurrentToken] = useState(
    localStorage.getItem('sessionToken') ? localStorage.getItem('sessionToken') : null,
  );

  const updateUserInfoAction = async (obj) => {
    setFormError('');
    setSubmitLoader(true);
    const res = await updateUserDetails(obj);
    res.data ? setCurrentAuthUser(res.data) : setFormError(res.error || 'NETWORK ERROR');
    setSubmitLoader(false);
  };
  const updateUserPasswordAction = async (obj) => {
    setFormError('');
    setSubmitLoader(true);
    const res = await updateUserPassword(obj);
    res.success ? setCurrentToken(res.token) : setFormError(res.error || 'NETWORK ERROR');
    setSubmitLoader(false);
  };

  return (
    <AppContext.Provider
      value={{
        loaderState: [submitLoader, setSubmitLoader],
        userState: [currentAuthUser],
        tokenState: [currentToken],
        formState: [formError, setFormError],
        updateUserInfoAction,
        updateUserPasswordAction,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line import/no-default-export
export default AppProvider;
