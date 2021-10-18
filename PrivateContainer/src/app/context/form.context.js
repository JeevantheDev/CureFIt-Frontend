import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const FormContext = React.createContext();

const FormProvider = ({ children }) => {
  const [submitLoader, setSubmitLoader] = useState(false);
  const [formError, setFormError] = useState('');
  const [isEditFlag, setIsEditFlag] = useState(false);
  const [selectedSpecalization, setSelectedSpecalization] = useState(null);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [selectedTrainingCertificate, setSelectedTrainingCertificate] = useState(null);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <FormContext.Provider
      value={{
        editState: [isEditFlag, setIsEditFlag],
        loaderState: [submitLoader, setSubmitLoader],
        formState: [formError, setFormError],
        specalistState: [selectedSpecalization, setSelectedSpecalization],
        educataionState: [selectedEducation, setSelectedEducation],
        experienceState: [selectedExperience, setSelectedExperience],
        trainAndCertificateState: [selectedTrainingCertificate, setSelectedTrainingCertificate],
        clinicState: [selectedClinic, setSelectedClinic],
        patientState: [selectedPatient, setSelectedPatient],
        reviewState: [selectedReview, setSelectedReview],
        productState: [selectedProduct, setSelectedProduct],
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line import/no-default-export
export default FormProvider;
