import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [activeRoute, setActiveRoute] = useState('/');
  const [publicFilterQuery, setPublicFilterQuery] = useState({});

  return (
    <AppContext.Provider
      value={{
        routeState: [activeRoute, setActiveRoute],
        filterState: [publicFilterQuery, setPublicFilterQuery],
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
