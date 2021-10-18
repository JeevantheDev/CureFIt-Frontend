import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const FormContext = React.createContext();

const FormProvider = ({ children }) => {
  const [submitLoader, setSubmitLoader] = useState(false);
  const [formError, setFormError] = useState('');
  const [isEditFlag, setIsEditFlag] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);

  return (
    <FormContext.Provider
      value={{
        editState: [isEditFlag, setIsEditFlag],
        loaderState: [submitLoader, setSubmitLoader],
        formState: [formError, setFormError],
        reviewState: [selectedReview, setSelectedReview],
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
