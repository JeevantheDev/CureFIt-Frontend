import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import moment from 'moment';
import { TabPanel, a11yProps } from '../shared/TabPanel/TabPanel';
import { ProfileContext } from '../../screens/profileScreen/context/profile.context';
import { useHistory, useParams } from 'react-router-dom';
import { PRIVATE_APPLICATION_URL } from '../../app/router/ApplicationRoutes';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  borderAppbar: {
    borderTop: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
  },
  fontBold: {
    fontWeight: 'bold',
  },
  greenText: {
    color: '#0EAC27',
    textTransform: 'none',
  },
}));

const TimeSlots = ({ clinicId, slots }) => {
  const classes = useStyles();
  const history = useHistory();
  const { slug } = useParams();

  const {
    timeSlotState: [currentSlot, setCurrentSlot],
  } = useContext(ProfileContext);

  const [value, setValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSelectSlot = (clinic_id, date, slot) => {
    setCurrentSlot({
      id: clinic_id,
      date,
      slot,
    });
    if (currentSlot) return;
    let timer = setTimeout(() => {
      history.push(PRIVATE_APPLICATION_URL.PUBLIC_PROFILES_SLUG_APPOINTMENT.replace(':slug', slug));
    }, [1500]);
    return () => clearTimeout(timer);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.borderAppbar} elevation={0} position="static" color="inherit">
        <Tabs
          value={value}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {slots.map((slot, index) => (
            <Tab
              key={index}
              label={
                <Box>
                  <Typography className={classes.fontBold}>{moment(slot.date).format('ll')}</Typography>
                  <span className={classes.greenText}>{slot.total_slots} Slots Available</span>
                </Box>
              }
              {...a11yProps(index)}
            />
          ))}
        </Tabs>
      </AppBar>

      {slots.map((slot, index) => (
        <TabPanel key={index} value={value} index={index}>
          <Box display="flex" justifyContent="space-evenly" alignItems="center" flexWrap="wrap">
            {slot.time_slots.map((time, i) => (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectSlot(clinicId, slot.date, time);
                }}
                style={{ marginBottom: '1rem' }}
                endIcon={<CancelIcon color="secondary" />}
                key={i}
                variant={
                  currentSlot &&
                  currentSlot.id === clinicId &&
                  currentSlot.date === slot.date &&
                  currentSlot.slot === time
                    ? 'contained'
                    : 'outlined'
                }
                color="primary"
              >
                {time}
              </Button>
            ))}
          </Box>
        </TabPanel>
      ))}
    </div>
  );
};

TimeSlots.propTypes = {
  clinicId: PropTypes.string.isRequired,
  slots: PropTypes.array.isRequired,
};

// eslint-disable-next-line import/no-default-export
export default React.memo(TimeSlots, (prevProps, nextProps) => {
  if (prevProps.clinicId === nextProps.clinicId) {
    return true;
  }
  return false;
});
