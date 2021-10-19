import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, Paper, Typography } from '@material-ui/core';
import { CheckoutContext } from '../../screens/checkoutScreen/context/checkout.context';

export const OrderSummary = (props) => {
  const {
    cartState: [cart],
    currentProductQty,
    calculateAmount,
  } = useContext(CheckoutContext);
  return (
    <Paper variant="outlined" elevation={0} style={{ padding: '1rem' }}>
      <Typography variant="h5" style={{ color: '#333', letterSpacing: '0.02em', fontWeight: 600 }} gutterBottom>
        Order Summary
      </Typography>
      <Typography variant="body1" color="textSecondary" gutterBottom>
        You have {cart.length} items in your shopping cart
      </Typography>
      <Divider />
      <Box my={2} px={2}>
        {cart.map((item) => (
          <Box key={item.id} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="body1" color="textSecondary" gutterBottom>
              {item.qty || 0} x {item.product_title || ''}
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              ₹{calculateAmount([item]) || 0}
            </Typography>
          </Box>
        ))}
      </Box>
      <Divider />
      <Box display="flex" justifyContent="space-between" alignItems="center" my={2} px={2}>
        <Typography variant="h6" style={{ color: '#333', letterSpacing: '0.02em', fontWeight: 600 }} gutterBottom>
          Total
        </Typography>
        <Typography variant="h6" style={{ color: '#333', letterSpacing: '0.02em', fontWeight: 600 }} gutterBottom>
          ₹{calculateAmount() || 0}
        </Typography>
      </Box>
    </Paper>
  );
};

OrderSummary.propTypes = {};
