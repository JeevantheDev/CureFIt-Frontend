import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import TimeSlots from './TimeSlots';
import Skeleton from '@material-ui/lab/Skeleton';
import { ProfileContext } from '../../screens/profileScreen/context/profile.context';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  parent: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: '100%',
    backgroundColor: theme.palette.background.paper,
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

export const ClinicDetails = ({ clinics, isLoading, inGroup = true }) => {
  const classes = useStyles();

  const {
    timeSlotState: [currentSlot],
  } = useContext(ProfileContext);

  const [currentClinic, setCurrentClinic] = useState(null);

  useEffect(() => {
    if (isLoading || !clinics || clinics.length === 0) return;
    setCurrentClinic(currentSlot ? currentSlot.id : clinics[0]._id);
  }, [isLoading, clinics]);

  return (
    <Box className={`${classes.parent}`}>
      <Grid className={classes.root} container>
        <div style={{ padding: '1rem 0 0 1rem' }}>
          <span className={`${classes.subText} ${classes.textUpper}`}>Pick a time slot</span>
        </div>
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
          <React.Fragment key={index}>
            <Grid style={{ padding: '0 1rem 1rem 1rem' }} item xs={12}>
              <Box display="flex" my={2} justifyContent="space-between" alignItems="start">
                <div style={{ width: '100%' }}>
                  <Typography className={classes.boldText} variant="h6" color="textPrimary">
                    {clinic ? clinic.clinic_name : <Skeleton width="30%" />}
                  </Typography>
                  <Typography className={`${classes.subText}`} display="inline">
                    {clinic ? `₹${clinic.fees}` : <Skeleton width="20%" />}
                  </Typography>
                  <Typography style={{ marginLeft: '0.5rem', fontWeight: 'bold' }} color="secondary" display="inline">
                    {clinic ? `Max ${clinic.waiting_time} wait` : <Skeleton width="30%" />}
                  </Typography>
                  <Typography style={{ marginTop: '0.5rem' }} className={`${classes.subText}`}>
                    {clinic ? clinic.clinic_address : <Skeleton />}
                  </Typography>
                </div>
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
                <TimeSlots clinicId={clinic._id} slots={clinic.available_slots} />
              ) : (
                <Skeleton variant="rect" height="40%" />
              )}
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
};

ClinicDetails.propTypes = {
  clinics: PropTypes.any,
  isLoading: PropTypes.bool.isRequired,
  inGroup: PropTypes.bool.isRequired,
};
