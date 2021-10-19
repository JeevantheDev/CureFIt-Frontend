import { Button, Grid, TextField, MenuItem } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';

import { FormContext } from '../../app/context/form.context';
import { PAYMENT_METHOD } from '../../app/entity/constant';
import { ServiceHeader } from '../ServiceHeader/ServiceHeader';

export const ShippingForm = ({ onSubmit }) => {
  const {
    loaderState: [submitLoader],
    formState: [formError],
    editState: [isEditFlag],
  } = useContext(FormContext);

  const [name, setName] = useState('');
  const [payment_method, setPaymentMethod] = useState('none');
  const [address, setAddress] = useState('');
  const [phone_no, setPhoneNo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      payment_method,
      address,
      phone_no: parseInt(phone_no),
      isEditFlag,
    });
  };

  return (
    <>
      <ServiceHeader title="Shipping Details" type="primary" />
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
              name="name"
              label="Add your name"
              placeholder="enter your name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              name="address"
              label="Add your address"
              placeholder="enter your address"
              variant="outlined"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              name="phone_no"
              label="Add your phone no"
              placeholder="enter your phone no"
              variant="outlined"
              value={phone_no}
              onChange={(e) => setPhoneNo(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              name="payment_method"
              variant="outlined"
              select
              color="secondary"
              value={payment_method}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <MenuItem style={{ backgroundColor: '#fff' }} value={'none'}>
                Choose your payment method
              </MenuItem>
              <MenuItem style={{ backgroundColor: '#fff' }} value={PAYMENT_METHOD.CARD}>
                {PAYMENT_METHOD.CARD}
              </MenuItem>
              <MenuItem style={{ backgroundColor: '#fff' }} value={PAYMENT_METHOD.CASH}>
                {PAYMENT_METHOD.CASH}
              </MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" color="secondary" type="submit">
              {isEditFlag ? (submitLoader ? 'Updating...' : 'Update') : submitLoader ? 'Submiting...' : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

ShippingForm.proptypes = {
  onSubmit: PropTypes.func.isRequired,
};
