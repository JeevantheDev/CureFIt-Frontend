import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { APPOINTMENT_TYPE } from '../../app/entity/constant';
import { Box, Button } from '@material-ui/core';
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

export const AppointmentForm = () => {
  const classes = useStyles();
  return (
    <>
      <ServiceHeader type="primary" title="Book Appointment" />
      <Box classsName={classes.parent}>
        <form className={classes.formRoot} noValidate autoComplete="off">
          <TextField name="patient_name" size="small" label="Patient Name" variant="outlined" />
          <TextField name="parent_name" size="small" label="Parent's Name" variant="outlined" />
          <TextField name="patient_age" type="number" size="small" label="Patient's Age" variant="outlined" />
          <TextField select name="appointment_type" size="small" label="Appointment Type" variant="outlined">
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
          />
          <Button variant="contained" color="primary">
            Book Appointment
          </Button>
        </form>
      </Box>
    </>
  );
};
