/* eslint-disable no-console */
import React, { useContext, useMemo } from 'react';
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from '@stripe/react-stripe-js';
import useResponsiveFontSize from './useResponsiveFontSize';
import { Button, Grid, TextField } from '@material-ui/core';
import { ServiceHeader } from '../ServiceHeader/ServiceHeader';
import { FormContext } from '../../app/context/form.context';

const useOptions = () => {
  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: '#424770',
          letterSpacing: '0.025em',
          fontFamily: 'Source Code Pro, monospace',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      },
    }),
    [fontSize],
  );

  return options;
};

export const CardForm = ({ submitCard }) => {
  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const {
    loaderState: [submitLoader],
  } = useContext(FormContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const payload = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardNumberElement),
    });
    payload.paymentMethod && submitCard(payload.paymentMethod);
  };

  return (
    <form style={{ margin: '1rem 0' }} onSubmit={handleSubmit}>
      <ServiceHeader title="Card Details" type="primary" />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            size="small"
            variant="outlined"
            label="Card Number"
            InputLabelProps={{ shrink: true }}
            InputProps={{ inputComponent: CardNumberElement, inputProps: options }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            size="small"
            variant="outlined"
            label="Expiration Date"
            InputLabelProps={{ shrink: true }}
            InputProps={{ inputComponent: CardExpiryElement, inputProps: options }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            size="small"
            variant="outlined"
            label="CVC"
            InputLabelProps={{ shrink: true }}
            InputProps={{ inputComponent: CardCvcElement, inputProps: options }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            disabled={submitLoader}
            fullWidth
            variant="contained"
            color="secondary"
            type="submit"
            disabled={!stripe}
          >
            {submitLoader ? 'Loading...' : 'Pay'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
