import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { FormContext } from '../../app/context/form.context';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, Typography } from '@material-ui/core';
import moment from 'moment';
import { APPOINTMENT_FORMAT } from '../../app/entity/constant';

const useStyles = makeStyles((theme) => ({
  labelText: {
    fontSize: '13px',
    letterSpacing: '0.15em',
    lineHeight: '18px',
    fontWeight: 500,
  },
  valueText: {
    fontSize: '22px',
    letterSpacing: '0.12em',
    lineHeight: '35px',
    fontWeight: 500,
  },
  serviceBox: {
    flex: 1,
    '&:last-child': {
      marginLeft: 'auto',
    },
  },
}));

const PatientInfo = ({ infoFor }) => {
  const classes = useStyles();
  const {
    patientState: [selectedPatient],
  } = useContext(FormContext);
  return (
    <Box minWidth={'35vw'}>
      <Box display="flex" alignItems="center" my={2}>
        {[
          { label: 'patient_name', value: 'PATIENT NAME' },
          { label: 'patient_age', value: 'PATIENT AGE' },
        ].map((service, n) => (
          <Box key={service.label} className={classes.serviceBox}>
            <Typography align="left" color="secondary" className={classes.labelText} gutterBottom>
              {service.value}
            </Typography>
            <Typography color="textPrimary" align="left" className={classes.valueText} gutterBottom>
              {selectedPatient[service.label]}
            </Typography>
          </Box>
        ))}
      </Box>
      <hr style={{ opacity: 0.3 }} />
      <Box display="flex" alignItems="center" my={2}>
        {[
          { label: 'parent_name', value: "PARENT'S NAME" },
          { label: 'clinic', value: 'CLINIC' },
        ].map((service, n) => (
          <Box key={service.label} className={classes.serviceBox}>
            <Typography align="left" color="secondary" className={classes.labelText} gutterBottom>
              {service.value}
            </Typography>
            <Typography color="textPrimary" align="left" className={classes.valueText} gutterBottom>
              {service.label === 'clinic' ? selectedPatient[service.label].clinic_name : selectedPatient[service.label]}
            </Typography>
          </Box>
        ))}
      </Box>
      <hr style={{ opacity: 0.3 }} />
      <Box display="flex" alignItems="center" my={2}>
        {[
          { label: 'appointment_type', value: 'APPOINTMENT TYPE' },
          { label: 'appointment_date', value: 'APPOINTMENT DATE' },
        ].map((service, n) => (
          <Box key={service.label} className={classes.serviceBox}>
            <Typography color="secondary" className={classes.labelText} gutterBottom>
              {service.value}
            </Typography>
            <Typography color="textPrimary" align="left" className={classes.valueText} gutterBottom>
              {service.label === 'appointment_date'
                ? moment(selectedPatient[service.label]).format('ll')
                : APPOINTMENT_FORMAT[selectedPatient[service.label]]}
            </Typography>
          </Box>
        ))}
      </Box>
      <hr style={{ opacity: 0.3 }} />
      <Box display="flex" alignItems="center" my={2}>
        {[
          { label: 'appointment_time', value: 'APPOINTMENT TIME' },
          { label: 'patient_id', value: 'PATIENT ID' },
        ].map((service, n) => (
          <Box key={service.label} className={classes.serviceBox}>
            <Typography color="secondary" className={classes.labelText} gutterBottom>
              {service.value}
            </Typography>
            <Typography color="textPrimary" align="left" className={classes.valueText} gutterBottom>
              {selectedPatient[service.label]}
            </Typography>
          </Box>
        ))}
      </Box>
      <hr style={{ opacity: 0.3 }} />
      <Box className={classes.serviceBox} my={2}>
        <Typography color="secondary" className={classes.labelText} gutterBottom>
          HEALTH PROBLEM
        </Typography>
        <Typography color="textSecondary" align="left" className={classes.labelText} gutterBottom>
          {selectedPatient.health_desc}
        </Typography>
      </Box>
      <hr style={{ opacity: 0.3 }} />
      <Box my={2} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Avatar src={selectedPatient[infoFor].avatar} />
        <Box my={1}>
          <Typography align="center" color="textSecondary" className={classes.labelText} gutterBottom>
            {selectedPatient[infoFor].user_name}
          </Typography>
          <Typography align="center" color="textSecondary" className={classes.labelText} gutterBottom>
            {selectedPatient[infoFor].user_email}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

PatientInfo.propTypes = {
  infoFor: PropTypes.string.isRequired,
};

// eslint-disable-next-line import/no-default-export
export default PatientInfo;
