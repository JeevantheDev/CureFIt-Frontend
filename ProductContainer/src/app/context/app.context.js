import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [currentAuthUser] = useState(
    localStorage.getItem('loggedInUser') ? JSON.parse(localStorage.getItem('loggedInUser') || '{}') : {},
  );
  const [currentToken] = useState(localStorage.getItem('sessionToken') ? localStorage.getItem('sessionToken') : null);
  return (
    <AppContext.Provider
      value={{
        userState: [currentAuthUser],
        tokenState: [currentToken],
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
