import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';
import AppProvider from './app/app.context';
import AuthProvider from './screens/authContainerScreen/context/auth.context';

ReactDOM.render(
  <AppProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </AppProvider>,
  document.querySelector('#root')
);
