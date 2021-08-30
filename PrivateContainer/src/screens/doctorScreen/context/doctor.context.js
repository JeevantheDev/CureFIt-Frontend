import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { createProfile, updateProfile, createClinic, updateClinic, deleteClinic } from '../../../app/api/profile.api';
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
    clinicState: [clinics, setClinics],
  } = useContext(ProfileContext);

  const [isEditFlag, setIsEditFlag] = useState(false);
  const [selectedSpecalization, setSelectedSpecalization] = useState(null);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedTrainingCertificate, setSelectedTrainingCertificate] = useState(null);
  const [selectedClinic, setSelectedClinic] = useState(null);

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
    const res = isEditFlag ? await updateClinic(clinicObj) : await createClinic(clinicObj);
    if (res.data) {
      const index = clinics.findIndex((x) => x._id === res.data._id);
      if (index !== -1) {
        const clinicList = clinics;
        clinicList[index] = res.data;
        setClinics(clinicList);
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
        editState: [isEditFlag, setIsEditFlag],
        specalistState: [selectedSpecalization, setSelectedSpecalization],
        educataionState: [selectedEducation, setSelectedEducation],
        experienceState: [selectedExperience, setSelectedExperience],
        trainAndCertificateState: [selectedTrainingCertificate, setSelectedTrainingCertificate],
        clinicState: [selectedClinic, setSelectedClinic],
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
