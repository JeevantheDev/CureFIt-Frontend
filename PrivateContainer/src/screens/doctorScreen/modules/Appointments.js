import 'react-datepicker/dist/react-datepicker.css';

import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import React, { forwardRef, useContext, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

import { AppContext } from '../../../app/context/app.context';
import { AppointmentsList } from '../../../components/AppointmentsList/AppointmentsList';
import { ServiceHeader } from '../../../components/shared/ServiceHeader/ServiceHeader';
import { UserContext } from '../../userScreen/context/user.context';

const useStyles = makeStyles((theme) => ({
  monthInput: {
    padding: '11px 15px',
    border: '2px solid #DBD9D9',
    width: '177px',
    height: '44px',
  },
}));

const Appointments = () => {
  const classes = useStyles();
  const {
    userState: [currentAuthUser],
  } = useContext(AppContext);
  const { getAppointmentsAction } = useContext(UserContext);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const CustomMonthBox = forwardRef(({ value, onClick }, ref) => (
    <input
      placeholder="Choose Month"
      className={classes.monthInput}
      type="text"
      value={value}
      onClick={onClick}
      ref={ref}
      label="Outlined"
    />
  ));

  useEffect(() => {
    selectedDate && getAppointmentsAction({ date: moment(selectedDate).format('l'), by_doctor: currentAuthUser._id });
  }, [selectedDate]);

  return (
    <div>
      <ServiceHeader title="Your Appointments">
        <Box>
          <DatePicker
            selected={selectedMonth}
            onChange={(date) => setSelectedMonth(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            customInput={<CustomMonthBox />}
          />
        </Box>
      </ServiceHeader>
      <AppointmentsList currDate={selectedMonth} onChangeDate={setSelectedDate} />
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default Appointments;
