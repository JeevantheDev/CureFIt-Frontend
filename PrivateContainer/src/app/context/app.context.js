import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { updateUserDetails, updateUserPassword } from '../api/shared.api';
import { FormContext } from './form.context';

export const AppContext = React.createContext();

const AppProvider = ({ children, value: { returnUrl, setReturnUrl } }) => {
  const {
    loaderState: [submitLoader, setSubmitLoader],
    formState: [formError, setFormError],
  } = useContext(FormContext);
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
        userState: [currentAuthUser],
        tokenState: [currentToken],
        updateUserInfoAction,
        updateUserPasswordAction,
        returnUrl,
        setReturnUrl,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  value: PropTypes.any,
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line import/no-default-export
export default AppProvider;
