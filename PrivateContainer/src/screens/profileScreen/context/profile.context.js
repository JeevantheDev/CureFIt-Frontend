import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getProfileById } from '../../../app/api/profile.api';
import { DEFAULT } from '../../../app/entity/constant';

export const ProfileContext = React.createContext();

const ProfileProvider = ({ children }) => {
  const [pageLoading, setPageLoading] = useState(false);
  const [currentProfile, setCurrentProfile] = useState();
  const [clinics, setClinics] = useState();
  const [currentSlot, setCurrentSlot] = useState(null);
  const [reviews, setReviews] = useState();
  const [limit, setLimit] = useState(DEFAULT.LIMIT);
  const [page, setPage] = useState(DEFAULT.PAGE);

  const fetchProfileById = async (profileId) => {
    setPageLoading(true);
    const res = await getProfileById(profileId);
    setCurrentProfile(res.data ? res.data.docProfile : {});
    setClinics(res.data ? res.data.docProfile.clinics : []);
    setReviews(res.data ? res.data.docProfile.reviews : []);
    setPageLoading(false);
  };

  return (
    <ProfileContext.Provider
      value={{
        loaderState: [pageLoading],
        profileState: [currentProfile, setCurrentProfile],
        clinicState: [clinics],
        timeSlotState: [currentSlot, setCurrentSlot],
        reviewState: [reviews],
        limitState: [limit, setLimit],
        pageState: [page, setPage],
        fetchProfileById,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

ProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line import/no-default-export
export default ProfileProvider;
