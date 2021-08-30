import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Typography, IconButton } from '@material-ui/core';
import TimeSlots from './TimeSlots';
import Skeleton from '@material-ui/lab/Skeleton';
import { ProfileContext } from '../../screens/profileScreen/context/profile.context';
import { AppContext } from '../../app/context/app.context';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { DoctorContext } from '../../screens/doctorScreen/context/doctor.context';
import ModalLayout from '../shared/ModalLayout/ModalLayout';
import { ClinicForm } from './form/ClinicForm';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  parent: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: '100%',
    backgroundColor: theme.palette.background.default,
  },

  subText: {
    fontWeight: '300',
    fontSize: '18px',
    lineHeight: '23px',
    letterSpacing: '0.07em',
    color: '#455A64',
  },
  textUpper: {
    textTransform: 'uppercase',
  },
  greenText: {
    color: '#0EAC27',
  },
  boldText: {
    fontWeight: 'bold',
  },
  customSelect: {
    fontSize: '14px',
    fontWeight: 'bold',
    lineHeight: '14px',
    letterSpacing: '0.09em',
    color: theme.palette.primary.main,
    border: 'none',
    backgroundColor: 'inherit',
  },
}));

export const ClinicDetails = ({ clinics, isEdit, isLoading, inGroup = true }) => {
  const classes = useStyles();

  const {
    timeSlotState: [currentSlot],
  } = useContext(ProfileContext);

  const {
    tokenState: [currentToken],
    formState: [formError, setFormError],
    userState: [currentAuthUser],
  } = useContext(AppContext);

  const {
    editState: [isEditFlag, setIsEditFlag],
    clinicState: [selectedClinic, setSelectedClinic],
    createUpdateClinicAction,
    deleteClinicAction,
  } = useContext(DoctorContext);

  const [currentClinic, setCurrentClinic] = useState(null);
  const [openModal] = useState(true);

  useEffect(() => {
    if (isLoading || !clinics || clinics.length === 0) return;
    setCurrentClinic(currentSlot ? currentSlot.id : clinics[0]._id);
  }, [isLoading, clinics]);

  const handleAddClinic = () => {
    setFormError('');
    setSelectedClinic({ clinic_name: '', clinic_address: '', contact_no: '', waiting_time: '', fees: '' });
    setIsEditFlag(false);
  };

  const handleUpdateClinic = (clinicObj, index) => {
    setFormError('');
    setSelectedClinic({ ...clinicObj, index: index, type: 'Update' });
    setIsEditFlag(true);
  };

  const handleDeleteClinic = (clinicId) => {
    confirm('Are you sure ??') && deleteClinicAction(clinicId);
  };

  const handleSubmitAction = (formObj) => {
    setFormError('');
    if (formObj.clinic_name && formObj.clinic_address) {
      const payloadObj = {
        ...formObj,
        isEditFlag,
        profileId: currentAuthUser.profile._id,
      };
      createUpdateClinicAction(payloadObj);
    } else {
      setFormError('FILL ALL THE FIELDS');
    }
  };

  const handleCloseModal = () => {
    setFormError('');
    setSelectedClinic(null);
  };

  return (
    <>
      {isEdit && currentToken && (
        <Box display="flex" px={1} mb={2} justifyContent="flex-end" alignItems="center">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleAddClinic();
            }}
            variant="outlined"
            startIcon={<AddIcon />}
            color="secondary"
          >
            <Typography variant="caption" color="primary">
              Add Your Clinic
            </Typography>
          </Button>
        </Box>
      )}
      {selectedClinic && selectedClinic.type !== 'Delete' && (
        <ModalLayout title="Add Clinic" open={openModal} handleClose={handleCloseModal}>
          <ClinicForm onSubmit={handleSubmitAction} />
        </ModalLayout>
      )}
      <Box className={`${classes.parent}`}>
        <Grid container spacing={2}>
          {!inGroup && (
            <div style={{ padding: '1rem 0 0 1rem' }}>
              <span className={`${classes.subText} ${classes.textUpper}`}>Pick a time slot</span>
            </div>
          )}
          {!isLoading && clinics && clinics.length === 0 && (
            <Grid style={{ padding: '1rem 1rem 1rem 1rem' }} item xs={12}>
              <Typography color="secondary" variant="body2">
                Sorry!! No clinics found...
              </Typography>
            </Grid>
          )}
          {(isLoading || !clinics
            ? Array.from(new Array(!inGroup ? 1 : 4))
            : clinics && !inGroup
            ? clinics.filter((clinic) => clinic._id === currentClinic)
            : clinics
          ).map((clinic, index) => (
            <Grid
              key={index}
              style={{ padding: '0 1rem 1rem 1rem' }}
              item
              xs={!inGroup ? 'auto' : 12}
              md={!inGroup ? 12 : 4}
            >
              <Grid style={{ padding: '0 1rem 1rem 1rem' }} item xs={12}>
                <Box display="flex" my={2} justifyContent="space-between" alignItems="start">
                  <div style={{ width: '100%' }}>
                    <Typography className={classes.boldText} variant="h6" color="textPrimary">
                      {clinic ? clinic.clinic_name : <Skeleton width="50%" />}
                    </Typography>
                    <Typography className={`${classes.subText}`} display="inline">
                      {clinic ? `${clinic.fees}` : <Skeleton width="30%" />}
                    </Typography>
                    <Typography style={{ marginLeft: '0.5rem', fontWeight: 'bold' }} color="secondary" display="inline">
                      {clinic ? `Max ${clinic.waiting_time} wait` : <Skeleton width="50%" />}
                    </Typography>
                    <Typography style={{ marginTop: '0.5rem' }} className={`${classes.subText}`}>
                      {clinic ? clinic.clinic_address : <Skeleton />}
                    </Typography>
                  </div>
                  {currentToken && isEdit && (
                    <>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateClinic(clinic, index);
                        }}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteClinic(clinic._id);
                        }}
                        color="secondary"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                  {!inGroup && clinic && (
                    <Box pt={0.8}>
                      <select
                        onChange={(e) => setCurrentClinic(e.target.value)}
                        className={classes.customSelect}
                        name="clinics"
                      >
                        <option value={clinics[0]._id}>Change Clinic</option>
                        {clinics.map((clinic) => (
                          <option key={clinic._id} value={clinic._id}>
                            {clinic.clinic_name}
                          </option>
                        ))}
                      </select>
                    </Box>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12}>
                {clinic && clinic.available_slots ? (
                  <TimeSlots isEdit={isEdit} clinicId={clinic._id} slots={clinic.available_slots} />
                ) : (
                  <Skeleton variant="rect" height="40%" />
                )}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

ClinicDetails.propTypes = {
  isEdit: PropTypes.bool.isRequired,
  clinics: PropTypes.any,
  isLoading: PropTypes.bool.isRequired,
  inGroup: PropTypes.bool.isRequired,
};
