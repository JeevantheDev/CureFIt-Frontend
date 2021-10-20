import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const AppContext = React.createContext();

const AppProvider = ({ value: { publicFilterQuery, returnUrl, setReturnUrl }, children }) => {
  const [currentAuthUser] = useState(
    localStorage.getItem('loggedInUser') ? JSON.parse(localStorage.getItem('loggedInUser') || '{}') : {},
  );
  const [currentToken] = useState(localStorage.getItem('sessionToken') ? localStorage.getItem('sessionToken') : null);
  return (
    <AppContext.Provider
      value={{ publicFilterQuery, returnUrl, setReturnUrl, userState: [currentAuthUser], tokenState: [currentToken] }}
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
