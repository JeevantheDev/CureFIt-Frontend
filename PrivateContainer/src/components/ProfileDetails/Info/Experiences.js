import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ProfileContext } from '../../../screens/profileScreen/context/profile.context';
import { makeStyles } from '@material-ui/core/styles';
import { Box, IconButton, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { AppContext } from '../../../app/context/app.context';
import { DoctorContext } from '../../../screens/doctorScreen/context/doctor.context';
import ModalLayout from '../../shared/ModalLayout/ModalLayout';
import { ExperienceForm } from '../form/ExperienceForm';

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

export const Experiences = ({ isEdit }) => {
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
    experienceState: [selectedExperience, setSelectedExperience],
    createUpdateProfileAction,
  } = useContext(DoctorContext);

  const [openModal] = useState(true);
  useEffect(() => {
    if (!selectedExperience || selectedExperience.type !== 'Delete') return;
    confirm('Are you sure ?') && handleSubmitAction();
  }, [selectedExperience]);

  const handleAddExperience = () => {
    setFormError('');
    setSelectedExperience({ work_place: '', position: '', year: '' });
    setIsEditFlag(currentProfile.slug ? true : false);
  };

  const handleUpdateExperience = ({ work_place, position, year }, index) => {
    setFormError('');
    setSelectedExperience({ work_place, position, year, index: index, type: 'Update' });
    setIsEditFlag(true);
  };

  const handleDeleteExperience = (index) => {
    setFormError('');
    setSelectedExperience({ index: index, type: 'Delete' });
    setIsEditFlag(true);
  };

  const handleSubmitAction = (formObj) => {
    let payloadObj;
    if (selectedExperience.type === 'Update') {
      currentProfile.experience[selectedExperience.index] = formObj;
      payloadObj = {
        experience: currentProfile.experience,
      };
    } else if (selectedExperience.type === 'Delete') {
      let updatedValue = currentProfile.experience.filter((value, idx) => idx !== selectedExperience.index);
      currentProfile.experience = updatedValue;
      payloadObj = {
        experience: currentProfile.experience,
      };
    } else {
      payloadObj = { experience: [...currentProfile.experience, formObj] };
    }
    createUpdateProfileAction(isEditFlag ? { ...payloadObj, id: currentAuthUser.profile.id } : payloadObj);
  };

  const handleCloseModal = () => {
    setFormError('');
    setSelectedExperience(null);
  };

  return (
    <Box display="flex" flexDirection="column">
      {currentToken && isEdit && (
        <Box mb={1} ml={'auto'}>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleAddExperience();
            }}
            variant="outlined"
            startIcon={<AddIcon />}
            color="secondary"
          >
            <Typography variant="caption" color="primary">
              Add Experience
            </Typography>
          </Button>
        </Box>
      )}
      {selectedExperience && selectedExperience.type !== 'Delete' && (
        <ModalLayout title="Add Experience" open={openModal} handleClose={handleCloseModal}>
          <ExperienceForm
            formError={formError}
            setFormError={setFormError}
            currentExperience={selectedExperience}
            loader={submitLoader}
            onSubmit={handleSubmitAction}
          />
        </ModalLayout>
      )}
      {currentProfile && (
        <ul className={classes.serviceList}>
          {currentProfile.experience && currentProfile.experience.length > 0 ? (
            currentProfile.experience.map((exp, idx) => (
              <li className={`${classes.boldText} ${classes.subText}`} key={idx}>
                {exp.work_place}, {exp.position}, {exp.year}
                {currentToken && isEdit && (
                  <>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUpdateExperience(exp, idx);
                      }}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteExperience(idx);
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
            <p className={`${classes.boldText} ${classes.subText}`}>No Experiences Found.</p>
          )}
        </ul>
      )}
    </Box>
  );
};

Experiences.propTypes = {
  isEdit: PropTypes.bool.isRequired,
};
