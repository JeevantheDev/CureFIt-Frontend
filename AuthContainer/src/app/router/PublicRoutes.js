import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { AUTH_APPLICATION_URL } from './ApplicationRoutes';

import SigninScreen from '../../screens/signinScreen/signinScreen';
import SignupScreen from '../../screens/signupScreen/signupScreen';
import PasswordResetScreen from '../../screens/passwordResetScreen/passwordResetScreen';

export const PublicRoutes = () => {
  return (
    <Switch>
      <Redirect exact from={AUTH_APPLICATION_URL.AUTH} to={AUTH_APPLICATION_URL.AUTH_SIGNIN} />
      <Route path={AUTH_APPLICATION_URL.AUTH_SIGNIN} component={SigninScreen} />
      <Route path={AUTH_APPLICATION_URL.AUTH_SIGNUP} component={SignupScreen} />
      <Route path={AUTH_APPLICATION_URL.AUTH_RESET_PASSWORD} component={PasswordResetScreen} />
      {/* <Redirect to={'/'} /> */}
    </Switch>
  );
};
