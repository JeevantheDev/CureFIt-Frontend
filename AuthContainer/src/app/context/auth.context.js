import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { userLogin, userSignup, forgetPassword, resetPassword } from '../api/auth.api';
import { RESPONSE } from '../entity/constant';

export const AuthContext = React.createContext();

const AuthProvider = ({ children, value: { onCompleteAuth } }) => {
  const [submitLoader, setSubmitLoader] = useState(false);
  const [currentUserType, setCurrentUserType] = useState(null);
  const [formError, setFormError] = useState('');

  const userLoginAction = async (obj) => {
    setFormError('');
    setSubmitLoader(true);
    const res = obj.passwordReset ? await forgetPassword(obj) : await userLogin(obj);
    !res.success ? setFormError(res.error || RESPONSE.NETWORK_ERROR) : setFormError(obj.passwordReset ? res.data : '');
    setSubmitLoader(false);
    onCompleteAuth && !obj.passwordReset && onCompleteAuth(res);
  };

  const userSignupAction = async (obj) => {
    setFormError('');
    setSubmitLoader(true);
    const res = await userSignup(obj);
    !res.success ? setFormError(res.error || RESPONSE.NETWORK_ERROR) : setFormError('');
    setSubmitLoader(false);
    onCompleteAuth && onCompleteAuth(res);
  };

  const resetPasswordAction = async (obj) => {
    setFormError('');
    setSubmitLoader(true);
    const res = await resetPassword(obj);
    !res.success ? setFormError(res.error || RESPONSE.NETWORK_ERROR) : setFormError('');
    setSubmitLoader(false);
    onCompleteAuth && onCompleteAuth(res);
  };

  return (
    <AuthContext.Provider
      value={{
        loaderState: [submitLoader, setSubmitLoader],
        userTypeState: [currentUserType, setCurrentUserType],
        authResponseState: [formError, setFormError],
        userLoginAction,
        userSignupAction,
        resetPasswordAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  value: PropTypes.object,
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line import/no-default-export
export default AuthProvider;
