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
import { TrainingCertificateForm } from '../form/TrainingCertificateForm';

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

export const TrainingCertificates = ({ isEdit }) => {
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
    trainAndCertificateState: [selectedTrainingCertificate, setSelectedTrainingCertificate],
  } = useContext(FormContext);

  const { createUpdateProfileAction } = useContext(DoctorContext);

  const [openModal] = useState(true);

  useEffect(() => {
    if (!selectedTrainingCertificate || selectedTrainingCertificate.type !== 'Delete') return;
    confirm('Are you sure ?') && handleSubmitAction();
  }, [selectedTrainingCertificate]);

  const handleAddTrainingCertificate = () => {
    setFormError('');
    setSelectedTrainingCertificate({ name: '', year: '' });
    setIsEditFlag(currentProfile.slug ? true : false);
  };

  const handleUpdateTrainingCertificate = ({ name, year }, index) => {
    setFormError('');
    setSelectedTrainingCertificate({ name, year, index: index, type: 'Update' });
    setIsEditFlag(true);
  };

  const handleDeleteTrainingCertificate = (index) => {
    setFormError('');
    setSelectedTrainingCertificate({ index: index, type: 'Delete' });
    setIsEditFlag(true);
  };

  const handleSubmitAction = (formObj) => {
    let payloadObj;
    if (selectedTrainingCertificate.type === 'Update') {
      currentProfile.training_certificates[selectedTrainingCertificate.index] = formObj;
      payloadObj = {
        training_certificates: currentProfile.training_certificates,
      };
    } else if (selectedTrainingCertificate.type === 'Delete') {
      let updatedValue = currentProfile.training_certificates.filter(
        (value, idx) => idx !== selectedTrainingCertificate.index,
      );
      currentProfile.training_certificates = updatedValue;
      payloadObj = {
        training_certificates: currentProfile.training_certificates,
      };
    } else {
      payloadObj = {
        training_certificates: currentProfile ? [...currentProfile.training_certificates, formObj] : [formObj],
      };
    }
    createUpdateProfileAction(isEditFlag ? { ...payloadObj, id: currentAuthUser.profile.id } : payloadObj);
  };

  const handleCloseModal = () => {
    setFormError('');
    setSelectedTrainingCertificate(null);
  };

  return (
    <Box display="flex" flexDirection="column">
      {currentToken && isEdit && (
        <Box mb={1} ml={'auto'}>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleAddTrainingCertificate();
            }}
            variant="outlined"
            startIcon={<AddIcon />}
            color="secondary"
          >
            <Typography variant="caption" color="primary">
              Add T&C
            </Typography>
          </Button>
        </Box>
      )}
      {selectedTrainingCertificate && selectedTrainingCertificate.type !== 'Delete' && (
        <ModalLayout title="Add Experience" open={openModal} handleClose={handleCloseModal}>
          <TrainingCertificateForm
            formError={formError}
            setFormError={setFormError}
            currentTrainingCertificate={selectedTrainingCertificate}
            loader={submitLoader}
            onSubmit={handleSubmitAction}
          />
        </ModalLayout>
      )}
      {currentProfile && (
        <ul className={classes.serviceList}>
          {currentProfile.training_certificates && currentProfile.training_certificates.length > 0 ? (
            currentProfile.training_certificates.map((training, idx) => (
              <li className={`${classes.boldText} ${classes.subText}`} key={idx}>
                {training.name}, {training.year}
                {currentToken && isEdit && (
                  <>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdateTrainingCertificate(training, idx);
                      }}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTrainingCertificate(idx);
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
            <p className={`${classes.boldText} ${classes.subText}`}>No Training & Certificates Found.</p>
          )}
        </ul>
      )}
    </Box>
  );
};

TrainingCertificates.propTypes = {
  isEdit: PropTypes.bool.isRequired,
};
