/* eslint-disable no-console */
import { Box, Button } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { AppContext } from '../../app/context/app.context';
import { FormContext } from '../../app/context/form.context';
import { APPOINTMENT_TYPE, USER_TYPE } from '../../app/entity/constant';
import { PRIVATE_APPLICATION_URL } from '../../app/router/ApplicationRoutes';
import { ProfileContext } from '../../screens/profileScreen/context/profile.context';
import { UserContext } from '../../screens/userScreen/context/user.context';
import { ServiceHeader } from '../shared/ServiceHeader/ServiceHeader';

const useStyles = makeStyles((theme) => ({
  parent: {
    backgroundColor: theme.palette.background.default,
  },
  formRoot: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    '& > *': {
      marginTop: theme.spacing(0.6),
      marginBottom: theme.spacing(2),
      width: 'auto',
    },
  },
}));

const AppointmentForm = ({ profile_id }) => {
  const classes = useStyles();
  const history = useHistory();
  const {
    userState: [currentAuthUser],
  } = useContext(AppContext);
  const {
    editState: [isEditFlag],
    loaderState: [submitLoader],
    formState: [formError],
    patientState: [selectedPatient],
  } = useContext(FormContext);
  const {
    timeSlotState: [currentSlot],
  } = useContext(ProfileContext);
  const { createUpdateAppointmentAction } = useContext(UserContext);

  const [patient_name, setPatientName] = useState('');
  const [parent_name, setParentName] = useState('');
  const [patient_age, setPatientAge] = useState('');
  const [appointment_type, setAppointmentType] = useState('');
  const [health_desc, setHealthDesc] = useState('');
  const [appointment_time, setAppointmentTime] = useState('');
  const [appointment_date, setAppointmentDate] = useState('');
  const [clinic_info, setCinicInfo] = useState('');
  const [redirectPath, setRedirectPath] = useState('');

  useEffect(() => {
    setPatientName(selectedPatient ? selectedPatient.patient_name : '');
    setParentName(selectedPatient ? selectedPatient.parent_name : '');
    setPatientAge(selectedPatient ? selectedPatient.patient_age : '');
    setAppointmentType(selectedPatient ? selectedPatient.appointment_type : '');
    setHealthDesc(selectedPatient ? selectedPatient.health_desc : '');
  }, [selectedPatient]);

  useEffect(() => {
    setAppointmentTime(selectedPatient ? selectedPatient.appointment_time : currentSlot ? currentSlot.slot : '');
    setAppointmentDate(selectedPatient ? selectedPatient.appointment_date : currentSlot ? currentSlot.date : '');
    setCinicInfo(selectedPatient ? selectedPatient.clinic_info : currentSlot ? currentSlot.id : '');
  }, [selectedPatient, currentSlot]);

  useEffect(() => {
    if (currentAuthUser.user_type === USER_TYPE.ADMIN) {
      setRedirectPath(PRIVATE_APPLICATION_URL.PRIVATE_ADMIN_APPOINTMENTS);
    } else if (currentAuthUser.user_type === USER_TYPE.DOCTOR) {
      setRedirectPath(PRIVATE_APPLICATION_URL.PRIVATE_DOCTOR_APPOINTMENTS_ME);
    } else if (currentAuthUser.user_type === USER_TYPE.SELLER) {
      setRedirectPath(PRIVATE_APPLICATION_URL.PRIVATE_SELLER_APPOINTMENTS);
    } else if (currentAuthUser.user_type === USER_TYPE.USER) {
      setRedirectPath(PRIVATE_APPLICATION_URL.PRIVATE_USER_APPOINTMENTS);
    } else return;
  }, [currentAuthUser]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const payloadObj = {
      profile_id,
      patient_name,
      parent_name,
      patient_age,
      patient_id: appointment_type
        ? `${Math.random().toString(36).substr(2, 5)}/${APPOINTMENT_TYPE[appointment_type].value}`
        : '',
      health_desc,
      appointment_time,
      appointment_date,
      appointment_type,
      clinic_info,
      isEditFlag: isEditFlag ? isEditFlag : false,
    };
    createUpdateAppointmentAction(payloadObj)
      .then((res) => {
        console.log(res);
        res && history.push(redirectPath);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <ServiceHeader type="primary" title="Book Appointment" />
      <Box classsName={classes.parent}>
        <form onSubmit={handleSubmitForm} className={classes.formRoot} noValidate autoComplete="off">
          {formError && (
            <Alert style={{ marginBottom: '1rem' }} severity="error">
              {formError}
            </Alert>
          )}
          <TextField
            value={patient_name}
            onChange={(e) => setPatientName(e.target.value)}
            name="patient_name"
            size="small"
            label="Patient Name"
            variant="outlined"
          />
          <TextField
            value={parent_name}
            onChange={(e) => setParentName(e.target.value)}
            name="parent_name"
            size="small"
            label="Parent's Name"
            variant="outlined"
          />
          <TextField
            value={patient_age}
            onChange={(e) => setPatientAge(e.target.value)}
            name="patient_age"
            type="number"
            size="small"
            label="Patient's Age"
            variant="outlined"
          />
          <TextField
            value={appointment_type}
            select
            name="appointment_type"
            size="small"
            label="Appointment Type"
            variant="outlined"
            onChange={(e) => setAppointmentType(e.target.value)}
          >
            <MenuItem style={{ backgroundColor: '#fff' }} value={null}>
              Choose Type
            </MenuItem>
            {APPOINTMENT_TYPE.map((format, idx) => (
              <MenuItem style={{ backgroundColor: '#fff' }} key={idx} value={format.type}>
                {format.label()}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            size="small"
            variant="outlined"
            label="Health Problem"
            name="health_desc"
            type="text"
            multiline
            minRows="7"
            value={health_desc}
            onChange={(e) => setHealthDesc(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            {isEditFlag
              ? submitLoader
                ? 'Updating...'
                : 'Update Appointment'
              : submitLoader
              ? 'Booking...'
              : 'Book Appointment'}
          </Button>
        </form>
      </Box>
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default AppointmentForm;
