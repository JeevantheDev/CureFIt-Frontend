import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { createProfile, updateProfile } from '../../../app/api/profile.api';
import { AppContext } from '../../../app/context/app.context';
import { ProfileContext } from '../../profileScreen/context/profile.context';

export const DoctorContext = React.createContext();

const DoctorProvider = ({ children }) => {
  const {
    loaderState: [submitLoader, setSubmitLoader],
    formState: [formError, setFormError],
  } = useContext(AppContext);
  const {
    profileState: [currentProfile, setCurrentProfile],
  } = useContext(ProfileContext);

  const [isEditFlag, setIsEditFlag] = useState(false);
  const [selectedSpecalization, setSelectedSpecalization] = useState(null);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedTrainingCertificate, setSelectedTrainingCertificate] = useState(null);

  const createUpdateProfileAction = async (profileObj) => {
    setFormError('');
    setSubmitLoader(true);
    const res = isEditFlag ? await updateProfile(profileObj) : await createProfile(profileObj);
    if (res.data) {
      setCurrentProfile(res.data);
      setSelectedSpecalization(null);
      setSelectedEducation(null);
      setSelectedExperience(null);
      setSelectedTrainingCertificate(null);
    } else {
      setFormError(res.error || 'NETWORK ERROR');
    }
    setSubmitLoader(false);
  };

  return (
    <DoctorContext.Provider
      value={{
        editState: [isEditFlag, setIsEditFlag],
        specalistState: [selectedSpecalization, setSelectedSpecalization],
        educataionState: [selectedEducation, setSelectedEducation],
        experienceState: [selectedExperience, setSelectedExperience],
        trainAndCertiState: [selectedTrainingCertificate, setSelectedTrainingCertificate],
        createUpdateProfileAction,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
};

DoctorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line import/no-default-export
export default DoctorProvider;
