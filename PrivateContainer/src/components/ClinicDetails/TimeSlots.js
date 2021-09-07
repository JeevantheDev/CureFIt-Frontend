import 'react-datepicker/dist/react-datepicker.css';

import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import CancelIcon from '@material-ui/icons/Cancel';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { forwardRef, useCallback, useContext, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { useHistory, useParams } from 'react-router-dom';

import { FormContext } from '../../app/context/form.context';
import { PRIVATE_APPLICATION_URL } from '../../app/router/ApplicationRoutes';
import { ProfileContext } from '../../screens/profileScreen/context/profile.context';
import { a11yProps, TabPanel } from '../shared/TabPanel/TabPanel';

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

const TimeSlots = ({ clinicId, slots, isEdit, onSubmit }) => {
  const classes = useStyles();
  const history = useHistory();
  const { slug } = useParams();

  const {
    timeSlotState: [currentSlot, setCurrentSlot],
  } = useContext(ProfileContext);
  const {
    editState: [isEditFlag, setIsEditFlag],
  } = useContext(FormContext);

  const [tabValue, setTabValue] = useState(0);
  const [currTime, setCurrTime] = useState(new Date());
  const [timeLists, setTimeLists] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isDocAvailable, setIsDocAvailable] = useState(false);

  useEffect(() => {
    slots[tabValue] && setTimeLists(slots[tabValue].time_slots.map((time) => time));
    slots[tabValue] && setIsDocAvailable(slots[tabValue].is_doc_available);
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

  const handleAddSlot = (availableCheck) => {
    const slotObj = {
      id: clinicId,
      isEditFlag: availableCheck !== undefined ? true : isEditFlag,
      available_slots: [
        {
          ...slots[tabValue],
          is_doc_available: availableCheck !== undefined ? availableCheck : isDocAvailable,
          time_slots: timeLists.sort((a, b) => new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b)),
        },
        ...slots.filter((slot, idx) => idx !== tabValue),
      ].sort((a, b) => new Date(a.date) - new Date(b.date)),
    };
    onSubmit(slotObj);
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
        <Box mt={2} display="flex" flexDirection="column" justifyContent="center" alignItems="center">
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
          {slots[tabValue] && (
            <FormControlLabel
              value="end"
              control={
                <Checkbox
                  onChange={(e) => {
                    setIsDocAvailable(e.target.checked);
                    handleAddSlot(e.target.checked);
                  }}
                  checked={isDocAvailable}
                  color="primary"
                />
              }
              label="I am available."
              labelPlacement="end"
            />
          )}
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
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddSlot();
                }}
                color="primary"
                variant="contained"
                size="small"
              >
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
  isEdit: PropTypes.bool,
  clinicId: PropTypes.string.isRequired,
  slots: PropTypes.array.isRequired,
};

// eslint-disable-next-line import/no-default-export
export default TimeSlots;
