import React from 'react';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { SignupForm } from '../../components/SignupForm/SignupForm';

const SignupScreen = () => {
  return (
    <AuthLayout>
      <SignupForm />
    </AuthLayout>
  );
};

// eslint-disable-next-line import/no-default-export
export default SignupScreen;
