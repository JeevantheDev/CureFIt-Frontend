import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ProfileContext } from '../../../screens/profileScreen/context/profile.context';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { AppContext } from '../../../app/context/app.context';
import { Box, IconButton, Typography } from '@material-ui/core';
import { DoctorContext } from '../../../screens/doctorScreen/context/doctor.context';
import ModalLayout from '../../shared/ModalLayout/ModalLayout';
import { SpecalizationForm } from '../form/SpecalizationForm';

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

export const Specalizations = ({ isEdit }) => {
  const classes = useStyles();

  const {
    profileState: [currentProfile],
  } = useContext(ProfileContext);

  const {
    tokenState: [currentToken],
    userState: [currentAuthUser],
    loaderState: [submitLoader],
    formState: [formError, setFormError],
  } = useContext(AppContext);

  const {
    editState: [isEditFlag, setIsEditFlag],
    specalistState: [selectedSpecalization, setSelectedSpecalization],
    createUpdateProfileAction,
  } = useContext(DoctorContext);

  const [openModal] = useState(true);

  useEffect(() => {
    if (!selectedSpecalization || selectedSpecalization.type !== 'Delete') return;
    confirm('Are you sure ?') && handleSubmitAction();
  }, [selectedSpecalization]);

  const handleAddSpecalist = () => {
    setFormError('');
    setSelectedSpecalization({ value: '' });
    setIsEditFlag(currentProfile.slug ? true : false);
  };

  const handleUpdateSpecalist = (specalist, index) => {
    setFormError('');
    setSelectedSpecalization({ value: specalist, index: index, type: 'Update' });
    setIsEditFlag(true);
  };

  const handleDeleteSpecalist = (index) => {
    setFormError('');
    setSelectedSpecalization({ index: index, type: 'Delete' });
    setIsEditFlag(true);
  };

  const handleSubmitAction = (formValue) => {
    let payloadObj;
    if (selectedSpecalization.type === 'Update') {
      currentProfile.specializations[selectedSpecalization.index] = formValue;
      payloadObj = {
        specializations: currentProfile.specializations,
      };
    } else if (selectedSpecalization.type === 'Delete') {
      let updatedValue = currentProfile.specializations.filter((value, idx) => idx !== selectedSpecalization.index);
      currentProfile.specializations = updatedValue;
      payloadObj = {
        specializations: currentProfile.specializations,
      };
    } else {
      payloadObj = { specializations: [...currentProfile.specializations, formValue] };
    }
    createUpdateProfileAction(isEditFlag ? { ...payloadObj, id: currentAuthUser.profile.id } : payloadObj);
  };

  const handleCloseModal = () => {
    setFormError('');
    setSelectedSpecalization(null);
  };

  return (
    <Box display="flex" flexDirection="column">
      {currentToken && isEdit && (
        <Box mb={1} ml={'auto'}>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleAddSpecalist();
            }}
            variant="outlined"
            startIcon={<AddIcon />}
            color="secondary"
          >
            <Typography variant="caption" color="primary">
              Add Specalization
            </Typography>
          </Button>
        </Box>
      )}
      {selectedSpecalization && selectedSpecalization.type !== 'Delete' && (
        <ModalLayout title="Add Specalization" open={openModal} handleClose={handleCloseModal}>
          <SpecalizationForm
            formError={formError}
            setFormError={setFormError}
            currentSpecalization={selectedSpecalization}
            loader={submitLoader}
            onSubmit={handleSubmitAction}
          />
        </ModalLayout>
      )}
      {currentProfile && (
        <ul className={classes.serviceList}>
          {currentProfile.specializations && currentProfile.specializations.length > 0 ? (
            currentProfile.specializations.map((specalist, idx) => (
              <li className={`${classes.boldText} ${classes.subText}`} key={idx}>
                {specalist}
                {currentToken && isEdit && (
                  <>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdateSpecalist(specalist, idx);
                      }}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSpecalist(idx);
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
            <p className={`${classes.boldText} ${classes.subText}`}>No Specalizations Found</p>
          )}
        </ul>
      )}
    </Box>
  );
};

Specalizations.propTypes = {
  isEdit: PropTypes.bool.isRequired,
};
