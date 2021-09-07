import 'react-datepicker/dist/react-datepicker.css';

import { Box, Button, Grid, IconButton, TextField, Typography } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { forwardRef, useContext, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

import { FormContext } from '../../../app/context/form.context';

export const ClinicForm = ({ onSubmit }) => {
  const {
    loaderState: [submitLoader],
    formState: [formError],
    editState: [isEditFlag],
    clinicState: [selectedClinic],
  } = useContext(FormContext);

  const [currDate, setCurrDate] = useState(new Date());
  const [selectedDateSlot, setSelectedDateSlot] = useState([]);
  const [clinic_name, setClinicName] = useState('');
  const [clinic_address, setClinicAddress] = useState('');
  const [contact_no, setContactNo] = useState('');
  const [waiting_time, setWaitingTime] = useState('');
  const [fees, setFees] = useState('');

  useEffect(() => {
    setClinicName(selectedClinic.clinic_name);
    setClinicAddress(selectedClinic.clinic_address);
    setContactNo(selectedClinic.contact_no);
    setWaitingTime(selectedClinic.waiting_time);
    setFees(selectedClinic.fees);
    setSelectedDateSlot(selectedClinic.available_slots ? selectedClinic.available_slots.map((slot) => slot) : []);
  }, [selectedClinic]);

  const handleDelete = (index) => (e) => {
    e.preventDefault();
    const updatedSlots = selectedDateSlot.filter((date, idx) => idx !== index);
    setSelectedDateSlot(updatedSlots);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: selectedClinic._id ? selectedClinic._id : '',
      clinic_name,
      clinic_address,
      contact_no,
      waiting_time,
      fees,
      available_slots: selectedDateSlot.sort((a, b) => new Date(a.date) - new Date(b.date)),
      isEditFlag,
    });
  };

  const AddDateButton = forwardRef(({ value, onClick }, ref) => (
    <IconButton
      variant="contained"
      color="primary"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      ref={ref}
    >
      <AddIcon />
    </IconButton>
  ));

  return (
    <form onSubmit={handleSubmit}>
      {formError && (
        <Alert style={{ marginBottom: '1rem' }} severity="error">
          {formError}
        </Alert>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            size="small"
            fullWidth
            name="clinic_name"
            label="Add your clinic name"
            placeholder="enter your clinic name"
            variant="outlined"
            value={clinic_name}
            onChange={(e) => setClinicName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            size="small"
            fullWidth
            name="clinic_address"
            label="Add your clinic address"
            placeholder="enter your clinic address"
            variant="outlined"
            value={clinic_address}
            onChange={(e) => setClinicAddress(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            size="small"
            type="text"
            fullWidth
            name="contact_no"
            label="Add your clinic contact no"
            placeholder="enter your clinic contact no"
            variant="outlined"
            value={contact_no}
            onChange={(e) => setContactNo(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            size="small"
            type="text"
            fullWidth
            name="waiting_time"
            label="Add your clinic waiting time"
            placeholder="enter clinic waiting time e.g: 30mins"
            variant="outlined"
            value={waiting_time}
            onChange={(e) => setWaitingTime(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            size="small"
            fullWidth
            name="fees"
            label="Add your clinic fees"
            placeholder="enter your clinic fees e.g: ₹450"
            variant="outlined"
            value={fees}
            onChange={(e) => setFees(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography>Add Your Date Slots</Typography>
            <DatePicker
              withPortal
              selected={currDate}
              onChange={(date) => {
                setCurrDate(date);
                setSelectedDateSlot((prevDates) => [...prevDates, { date }]);
              }}
              customInput={<AddDateButton />}
            />
          </Box>
          <Box display="flex" minWidth="80%" justifyContent="center" alignItems="center" flexWrap="wrap">
            {selectedDateSlot.map((slot, idx) => (
              <Chip
                style={{ marginBottom: '1rem', marginRight: '1rem' }}
                key={idx}
                label={moment(slot.date).format('ll')}
                onDelete={handleDelete(idx)}
              />
            ))}
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="contained" color="secondary" type="submit">
            {isEditFlag ? (submitLoader ? 'Updating...' : 'Update') : submitLoader ? 'Adding...' : 'Add'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

ClinicForm.proptypes = {
  onSubmit: PropTypes.func.isRequired,
};
