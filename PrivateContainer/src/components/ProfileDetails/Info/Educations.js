import { Box, IconButton, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../../app/context/app.context';
import { FormContext } from '../../../app/context/form.context';
import { DoctorContext } from '../../../screens/doctorScreen/context/doctor.context';
import { ProfileContext } from '../../../screens/profileScreen/context/profile.context';
import ModalLayout from '../../shared/ModalLayout/ModalLayout';
import { EducationForm } from '../form/EducationForm';

const useStyles = makeStyles((theme) => ({
  serviceList: { padding: '0 1rem', maxHeight: '15rem', display: 'flex', flexDirection: 'column', flexWrap: 'wrap' },
  subText: {
    fontWeight: '300',
    fontSize: '18px',
    lineHeight: '30px',
    letterSpacing: '0.08em',
    color: '#455A64',
  },
  boldText: {
    fontWeight: 'bold',
  },
}));

export const Educations = ({ isEdit }) => {
  const classes = useStyles();
  const {
    profileState: [currentProfile],
  } = useContext(ProfileContext);

  const {
    tokenState: [currentToken],
    userState: [currentAuthUser],
  } = useContext(AppContext);

  const {
    loaderState: [submitLoader],
    formState: [formError, setFormError],
    editState: [isEditFlag, setIsEditFlag],
    educataionState: [selectedEducation, setSelectedEducation],
  } = useContext(FormContext);

  const { createUpdateProfileAction } = useContext(DoctorContext);

  const [openModal] = useState(true);

  useEffect(() => {
    if (!selectedEducation || selectedEducation.type !== 'Delete') return;
    confirm('Are you sure ?') && handleSubmitAction();
  }, [selectedEducation]);

  const handleAddEducation = () => {
    setFormError('');
    setSelectedEducation({ degree: '', college: '', year: '' });
    setIsEditFlag(currentProfile.slug ? true : false);
  };

  const handleUpdateEducation = ({ degree, college, year }, index) => {
    setFormError('');
    setSelectedEducation({ degree, college, year, index: index, type: 'Update' });
    setIsEditFlag(true);
  };

  const handleDeleteEducation = (index) => {
    setFormError('');
    setSelectedEducation({ index: index, type: 'Delete' });
    setIsEditFlag(true);
  };

  const handleSubmitAction = (formObj) => {
    let payloadObj;
    if (selectedEducation.type === 'Update') {
      currentProfile.education[selectedEducation.index] = formObj;
      payloadObj = {
        education: currentProfile.education,
      };
    } else if (selectedEducation.type === 'Delete') {
      let updatedValue = currentProfile.education.filter((value, idx) => idx !== selectedEducation.index);
      currentProfile.education = updatedValue;
      payloadObj = {
        education: currentProfile.education,
      };
    } else {
      payloadObj = { education: currentProfile ? [...currentProfile.education, formObj] : [formObj] };
    }
    createUpdateProfileAction(isEditFlag ? { ...payloadObj, id: currentAuthUser.profile.id } : payloadObj);
  };

  const handleCloseModal = () => {
    setFormError('');
    setSelectedEducation(null);
  };

  return (
    <Box display="flex" flexDirection="column">
      {currentToken && isEdit && (
        <Box mb={1} ml={'auto'}>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleAddEducation();
            }}
            variant="outlined"
            startIcon={<AddIcon />}
            color="secondary"
          >
            <Typography variant="caption" color="primary">
              Add Education
            </Typography>
          </Button>
        </Box>
      )}
      {selectedEducation && selectedEducation.type !== 'Delete' && (
        <ModalLayout title="Add Education" open={openModal} handleClose={handleCloseModal}>
          <EducationForm
            formError={formError}
            setFormError={setFormError}
            currentEducation={selectedEducation}
            loader={submitLoader}
            onSubmit={handleSubmitAction}
          />
        </ModalLayout>
      )}
      {currentProfile && (
        <ul className={classes.serviceList}>
          {currentProfile.education && currentProfile.education.length > 0 ? (
            currentProfile.education.map((edu, idx) => (
              <li className={`${classes.boldText} ${classes.subText}`} key={idx}>
                {edu.degree}, {edu.college}, {edu.year}
                {currentToken && isEdit && (
                  <>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdateEducation(edu, idx);
                      }}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteEducation(idx);
                      }}
                      color="secondary"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </li>
            ))
          ) : (
            <p className={`${classes.boldText} ${classes.subText}`}>No Educations Found</p>
          )}
        </ul>
      )}
    </Box>
  );
};

Educations.propTypes = {
  isEdit: PropTypes.bool.isRequired,
};
