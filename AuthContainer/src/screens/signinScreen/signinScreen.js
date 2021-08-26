import React from 'react';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { SigninForm } from '../../components/SigninForm/SigninForm';

const SigninScreen = () => {
  return (
    <AuthLayout>
      <SigninForm />
    </AuthLayout>
  );
};

// eslint-disable-next-line import/no-default-export
export default SigninScreen;
