import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getDoctorProfiles } from '../../../app/api/profile.api';
import { DEFAULT } from '../../../app/entity/constant';

export const ProfileContext = React.createContext();

const ProfileProvider = ({
  value: { filterQuery, setPublicFilterQuery, isUserAuth, returnUrl, setReturnUrl },
  children,
}) => {
  const [currentToken] = useState(localStorage.getItem('sessionToken') ? localStorage.getItem('sessionToken') : null);
  const [pageLoading, setPageLoading] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [limit, setLimit] = useState(DEFAULT.LIMIT);
  const [page, setPage] = useState(DEFAULT.PAGE);

  const fetchProfiles = async () => {
    setPageLoading(true);
    const res = await getDoctorProfiles(filterQuery, limit, page);
    setProfiles(res.data);
    setPageLoading(false);
  };

  return (
    <ProfileContext.Provider
      value={{
        filterQuery,
        setPublicFilterQuery,
        isUserAuth,
        tokenState: [currentToken],
        loaderState: [pageLoading],
        profilesState: [profiles],
        limitState: [limit, setLimit],
        pageState: [page, setPage],
        fetchProfiles,
        returnUrl,
        setReturnUrl,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

ProfileProvider.propTypes = {
  value: PropTypes.object,
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line import/no-default-export
export default ProfileProvider;
