import { Avatar, Box, Button, Divider, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';
import React, { useCallback, useContext } from 'react';
import { FormContext } from '../../../app/context/form.context';

import { APPOINTMENT_FORMAT } from '../../../app/entity/constant';
import { ProfileContext } from '../../../screens/profileScreen/context/profile.context';
import { UserContext } from '../../../screens/userScreen/context/user.context';
import PatientInfo from '../../PatientInfo/PatientInfo';
import ModalLayout from '../../shared/ModalLayout/ModalLayout';

const useStyles = makeStyles((theme) => ({
  parentBox: {
    boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25)`,
    padding: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  textName: {
    fontSize: '18px',
    lineHeight: '18px',
    letterSpacing: '0.09em',
    marginBottom: '0.8rem',
  },
  subTextName: {
    fontSize: '15px',
    lineHeight: '12px',
    letterSpacing: '0.09em',
  },
}));

const AppointmentCards = ({ isCollapse }) => {
  const classes = useStyles();

  const {
    loaderState: [pageLoading],
  } = useContext(ProfileContext);
  const {
    appointmentState: [appointments],
  } = useContext(UserContext);
  const {
    patientState: [selectedPatient, setSelectedPatient],
  } = useContext(FormContext);

  const handleCloseModal = () => {
    setSelectedPatient(null);
  };

  const isModalMount = useCallback(() => {
    return selectedPatient ? true : false;
  }, [selectedPatient]);

  return (
    <>
      {!pageLoading && appointments && appointments.length === 0 && <p>No Appointments Found</p>}
      {(pageLoading || !appointments ? Array.from(new Array(10)) : appointments).map((appointment, idx) => (
        <Box className={classes.parentBox}>
          <Box mb={2} display="flex">
            {appointment ? (
              <Avatar src={appointment.user.avatar} />
            ) : (
              <Skeleton variant="circle" width={50} height={50} />
            )}
            <Box mx={2}>
              <Typography className={classes.textName} gutterBottom color="textPrimary">
                {appointment ? appointment.patient_name : <Skeleton variant="text" width={150} height={20} />}
              </Typography>
              <Typography className={classes.subTextName} gutterBottom color="textSecondary">
                {appointment ? appointment.user.user_email : <Skeleton variant="text" />}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box display="flex" mt={2} flexDirection="column">
            <Box mx={2}>
              <Typography className={classes.textName} gutterBottom color="textSecondary">
                {appointment ? `Patient Age: ${appointment.patient_age}` : <Skeleton variant="text" />}
              </Typography>
              <Typography className={classes.textName} gutterBottom color="textSecondary">
                {appointment ? `Patient ID: ${appointment.patient_id}` : <Skeleton variant="text" />}
              </Typography>
            </Box>
            {appointment && (
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPatient(appointment);
                  }}
                  color="secondary"
                  variant="text"
                >
                  View
                </Button>
                <span>{APPOINTMENT_FORMAT[appointment.appointment_type]}</span>
              </Box>
            )}
          </Box>
        </Box>
      ))}
      {isModalMount() && (
        <ModalLayout title="Patient Details" open={true} handleClose={handleCloseModal}>
          <PatientInfo infoFor="user" />
        </ModalLayout>
      )}
    </>
  );
};

AppointmentCards.propTypes = {
  isCollapse: PropTypes.bool.isRequired,
};

function propsAreEqual(prevProps, nextProps) {
  return prevProps.isCollapse === nextProps.isCollapse ? true : false;
}

// eslint-disable-next-line import/no-default-export
export default React.memo(AppointmentCards, propsAreEqual);
