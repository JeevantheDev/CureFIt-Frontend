import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';

import { useDelayedRender } from '../../app/helpers/useDelayedRender';
import { UserContext } from '../../screens/userScreen/context/user.context';
import AppointmentCards from './AppointmentCards/AppointmentCards';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: '100%',
    minHeight: '80vh',
    overflowY: 'hidden',
    overflowX: 'scroll',
    '&::-webkit-scrollbar': {
      overflow: 'hidden',
    },
  },
  parent: {
    backgroundColor: theme.palette.background.paper,
    border: theme.spacing(0.3),
    borderColor: '#c4c4c4',
    borderStyle: 'solid',
    '&:hover': {
      cursor: 'pointer',
    },
  },

  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  dateTextContainer: {
    padding: theme.spacing(0.5),
    maxWidth: '100%',
    height: '13%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: '#fff',
  },
  cardSuperContainer: {
    height: '87%',
    borderBottom: '5px',
    borderBottomStyle: 'solid',
  },
  cardContainer: {
    display: 'flex',
    padding: theme.spacing(2),
    alignItems: 'center',
    flexWrap: 'wrap',
  },
}));

export const AppointmentsList = ({ currDate, onChangeDate }) => {
  const classes = useStyles();

  const { resetAppointmentState } = useContext(UserContext);

  const [MIN_WIDTH_CLASS, setMinWidthClass] = useState('panel-width-auto');
  const [isCollapse, setIsCollapse] = useState(false);
  const [selectedPanel, setSelectedPanel] = useState();

  const handleChangeWidth = (idx, date) => (e) => {
    e.stopPropagation();
    setMinWidthClass(MIN_WIDTH_CLASS === 'panel-width-auto' ? 'panel-width-min' : 'panel-width-auto');
    setIsCollapse(!isCollapse);
    setSelectedPanel(idx);
    onChangeDate(!isCollapse ? date : null);
    isCollapse && resetAppointmentState();
  };

  // console.log(isCollapse);
  const DelayedRender = ({ delay, children }) => useDelayedRender(delay)(() => isCollapse && children);

  return (
    <Box display="flex" className={classes.root}>
      {getDaysInMonth(currDate.getMonth(), currDate.getFullYear()).map((date, index) => (
        <Box
          className={`${classes.parent} panel-transition ${
            selectedPanel == index ? MIN_WIDTH_CLASS : 'panel-width-auto'
          }`}
          mr={2}
          key={index}
        >
          <Box
            className={classes.dateTextContainer}
            borderColor="primary"
            style={{
              backgroundColor: moment(date).format('ll') == moment(new Date()).format('ll') ? '#004071' : '#333',
            }}
            onClick={handleChangeWidth(index, date)}
          >
            <Typography align="left">{moment(date).format('ll')}</Typography>
          </Box>
          <div
            className={classes.cardSuperContainer}
            style={{
              borderBottomColor: moment(date).format('ll') == moment(new Date()).format('ll') ? '#004071' : '#333',
            }}
          >
            <div className={classes.cardContainer}>
              <DelayedRender delay={400}>
                {selectedPanel == index && <AppointmentCards isCollapse={!isCollapse} />}
              </DelayedRender>
            </div>
          </div>
        </Box>
      ))}
    </Box>
  );
};

/**
 * @param {int} The
 * @param {int} The
 * @return {Date[]}
 */
function getDaysInMonth(month, year) {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

AppointmentsList.propTypes = {
  currDate: PropTypes.any,
  onChangeDate: PropTypes.func.isRequired,
};
