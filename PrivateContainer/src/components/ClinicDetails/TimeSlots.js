import React from 'react';
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

export const TimeSlots = ({ slots }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
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
                style={{ marginBottom: '1rem' }}
                endIcon={<CancelIcon color="secondary" />}
                key={i}
                variant="outlined"
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
  slots: PropTypes.array.isRequired,
};
