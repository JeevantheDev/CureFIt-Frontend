import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';

import { createClinic, createProfile, deleteClinic, updateClinic, updateProfile } from '../../../app/api/profile.api';
import { FormContext } from '../../../app/context/form.context';
import { ProfileContext } from '../../profileScreen/context/profile.context';

export const DoctorContext = React.createContext();

const DoctorProvider = ({ children }) => {
  const {
    editState: [isEditFlag, setIsEditFlag],
    loaderState: [submitLoader, setSubmitLoader],
    formState: [formError, setFormError],
    specalistState: [selectedSpecalization, setSelectedSpecalization],
    educataionState: [selectedEducation, setSelectedEducation],
    experienceState: [selectedExperience, setSelectedExperience],
    trainAndCertificateState: [selectedTrainingCertificate, setSelectedTrainingCertificate],
    clinicState: [selectedClinic, setSelectedClinic],
  } = useContext(FormContext);

  const {
    loaderState: [pageLoading, setPageLoading],
    profileState: [currentProfile, setCurrentProfile],
    clinicState: [clinics, setClinics],
  } = useContext(ProfileContext);

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

  const createUpdateClinicAction = async (clinicObj) => {
    setFormError('');
    setSubmitLoader(true);
    const res = clinicObj.isEditFlag ? await updateClinic(clinicObj) : await createClinic(clinicObj);
    if (res.data) {
      const index = clinics.findIndex((x) => x._id === res.data._id);
      if (index !== -1) {
        const clinicList = clinics;
        clinicList[index] = res.data;
        setClinics(clinicList);
        setIsEditFlag(false);
      } else {
        setClinics((prevList) => [...prevList, res.data]);
      }
      setSelectedClinic(null);
    } else {
      setFormError(res.error || 'NETWORK ERROR');
    }
    setSubmitLoader(false);
  };

  const deleteClinicAction = async (clinicId) => {
    setFormError('');
    setSubmitLoader(true);
    const res = await deleteClinic(clinicId);
    if (res.data) {
      const index = clinics.findIndex((x) => x._id === res.data.id);
      if (index !== -1) {
        const clinicList = clinics;
        clinicList.splice(index, 1);
        setClinics(clinicList);
      }
      setSelectedClinic(null);
    } else {
      setFormError(res.error || 'NETWORK ERROR');
    }
    setSubmitLoader(false);
  };

  return (
    <DoctorContext.Provider
      value={{
        createUpdateProfileAction,
        createUpdateClinicAction,
        deleteClinicAction,
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
