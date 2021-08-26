import React from 'react';
import { AuthLayout } from '../../components/AuthLayout/AuthLayout';
import { PasswordForm } from '../../components/PasswordForm/PasswordForm';

const PasswordResetScreen = () => {
  return (
    <AuthLayout>
      <PasswordForm />
    </AuthLayout>
  );
};

// eslint-disable-next-line import/no-default-export
export default PasswordResetScreen;
