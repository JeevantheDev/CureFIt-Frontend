import React, { useContext, useState, forwardRef, useEffect } from 'react';
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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { DoctorContext } from '../../screens/doctorScreen/context/doctor.context';

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

const TimeSlots = ({ clinicId, slots, isEdit }) => {
  const classes = useStyles();
  const history = useHistory();
  const { slug } = useParams();

  const {
    timeSlotState: [currentSlot, setCurrentSlot],
  } = useContext(ProfileContext);
  const {
    editState: [isEditFlag, setIsEditFlag],
  } = useContext(DoctorContext);

  const [tabValue, setTabValue] = useState(0);
  const [currTime, setCurrTime] = useState(new Date());
  const [timeLists, setTimeLists] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    setTimeLists(slots[tabValue].time_slots.map((time) => time));
  }, [slots, tabValue]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSelectedSlot(null);
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

  const handleDeleteSlot = (index, slotId) => {
    setIsEditFlag(true);
    setSelectedSlot(slotId);
    const newTimeList = timeLists.filter((time, idx) => idx !== index);
    setTimeLists(newTimeList);
  };

  const AddTimeButton = forwardRef(({ value, onClick }, ref) => (
    <Button
      onClick={(e) => {
        e.preventDefault();
        setIsEditFlag(true);
        setSelectedSlot(slots[tabValue]._id);
        onClick(e);
      }}
      ref={ref}
      color="secondary"
      variant="outlined"
    >
      <Typography color="primary" variant="caption">
        Add a Time Slot
      </Typography>
    </Button>
  ));

  return (
    <div className={classes.root}>
      <AppBar className={classes.borderAppbar} elevation={0} position="static" color="inherit">
        <Tabs
          value={tabValue}
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
      {isEdit && (
        <Box mt={2} display="flex" justifyContent="center" alignItems="center">
          <DatePicker
            selected={currTime}
            onChange={(date) => {
              setCurrTime(date);
              setTimeLists((prevList) => [...prevList, moment(date).format('LT')]);
            }}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            withPortal
            customInput={<AddTimeButton />}
          />
        </Box>
      )}
      {slots.map((slot, index) => (
        <>
          <TabPanel key={index} value={tabValue} index={index}>
            <Box display="flex" justifyContent="space-evenly" alignItems="center" flexWrap="wrap">
              {timeLists.map((time, i) => (
                <>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      !isEdit ? handleSelectSlot(clinicId, slot.date, time) : handleDeleteSlot(i, slot._id);
                    }}
                    style={{ marginBottom: '1rem' }}
                    endIcon={isEdit && <CancelIcon color="secondary" />}
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
                </>
              ))}
            </Box>
          </TabPanel>
          {isEditFlag && slot._id === selectedSlot && (
            <Box display="flex" justifyContent="center" alignItems="center">
              <Button color="primary" variant="contained" size="small">
                <Typography variant="caption">Submit</Typography>
              </Button>
            </Box>
          )}
        </>
      ))}
    </div>
  );
};

TimeSlots.propTypes = {
  isEdit: PropTypes.bool.isRequired,
  clinicId: PropTypes.string.isRequired,
  slots: PropTypes.array.isRequired,
};

// eslint-disable-next-line import/no-default-export
export default TimeSlots;
