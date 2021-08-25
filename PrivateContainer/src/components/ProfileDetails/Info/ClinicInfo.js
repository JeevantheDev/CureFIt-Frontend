import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Button, Box, Divider } from '@material-ui/core';
import { ProfileContext } from '../../../screens/profileScreen/context/profile.context';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import moment from 'moment';
import { useHistory, useParams } from 'react-router-dom';
import { PRIVATE_APPLICATION_URL } from '../../../app/router/ApplicationRoutes';

const useStyles = makeStyles((theme) => ({
  subText: {
    fontWeight: '300',
    fontSize: '15px',
    lineHeight: '23px',
    letterSpacing: '0.07em',
    color: '#455A64',
  },
  subTextTwo: {
    fontWeight: '300',
    fontSize: '15px',
    lineHeight: '18px',
    letterSpacing: '0.07em',
    color: '#979797',
  },
  boldText: {
    fontWeight: 'bold',
  },
}));

export const ClinicInfo = () => {
  const classes = useStyles();
  const history = useHistory();
  const { slug } = useParams();

  const {
    clinicState: [clinics],
    timeSlotState: [currentSlot, setCurrentSlot],
  } = useContext(ProfileContext);

  const [moreThanOne, setMoreThanOne] = useState(1);

  const proceedAppointment = (clinicId) => {
    setCurrentSlot({
      id: clinicId,
      date: '',
      slot: '',
    });
    history.push(PRIVATE_APPLICATION_URL.PUBLIC_PROFILES_SLUG_APPOINTMENT.replace(':slug', slug));
  };

  return (
    <>
      {clinics &&
        clinics.slice(0, moreThanOne).map((clinic, idx) => (
          <>
            <Grid container key={idx}>
              <Grid item xs={12} md={5}>
                <Typography className={`${classes.subTextTwo}`} display="inline">
                  {clinic.location.city}, {clinic.location.state}
                </Typography>
                <Typography className={classes.boldText} variant="h6" color="textPrimary" gutterBottom>
                  {clinic.clinic_name}
                </Typography>
                <Typography className={`${classes.subText}`} display="inline" gutterBottom>
                  {clinic.clinic_address}
                </Typography>
                <Box my={0.5}>
                  <Button variant="text" color="secondary" startIcon={<AddLocationIcon />}>
                    <Typography
                      style={{ textDecoration: 'underline' }}
                      variant="button"
                      color="textPrimary"
                      className={classes.boldText}
                    >
                      Get Direction
                    </Typography>
                  </Button>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography className={`${classes.subText} ${classes.boldText}`} gutterBottom>
                  {moment(clinic.available_slots[0].date).format('dddd')} -{' '}
                  {moment(clinic.available_slots[clinic.available_slots.length - 1].date).format('dddd')}
                </Typography>
                <Typography className={`${classes.subTextTwo}`} gutterBottom>
                  {moment(clinic.available_slots[0].date).format('LT')} -{' '}
                  {moment(clinic.available_slots[clinic.available_slots.length - 1].date).format('LT')}
                </Typography>
              </Grid>
              <Grid xs={12} item md={3}>
                <Typography className={`${classes.subText}  ${classes.boldText}`} display="block">
                  {`₹${clinic.fees}`}
                </Typography>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    proceedAppointment(clinic._id);
                  }}
                  style={{ marginTop: '70px' }}
                  size="small"
                  color="primary"
                  variant="contained"
                >
                  Book Appointment
                </Button>
              </Grid>
            </Grid>
            {idx !== clinics.length - 1 && <Divider style={{ margin: '1.2rem 0' }} />}
          </>
        ))}
      {clinics && clinics.length > 1 && (
        <Box display="flex" my={1.5} justifyContent="center" alignItems="center">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setMoreThanOne(moreThanOne === 1 ? clinics.length : 1);
            }}
            className={classes.boldText}
            variant="outlined"
            color="default"
            size="small"
          >
            {moreThanOne > 1 ? 'Less' : 'More'}
          </Button>
        </Box>
      )}
      {clinics && clinics.length === 0 && (
        <Typography className={`${classes.subText}`} display="inline" gutterBottom>
          No Clinics Found !!
        </Typography>
      )}
    </>
  );
};
