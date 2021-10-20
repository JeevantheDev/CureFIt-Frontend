import { Box, Divider, Grid, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import Alert from '@material-ui/lab/Alert';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { DEFAULT } from '../../../app/entity/constant';

import { OrderSummary } from '../../../components/OrderSummary/OrderSummary';
import { ServiceHeader } from '../../../components/ServiceHeader/ServiceHeader';
import { ProductContext } from '../../productScreen/context/product.context';
import { CheckoutContext } from '../context/checkout.context';

const CheckoutSuccess = () => {
  const { id } = useParams();
  const {
    orderState: [order],
    getOrderByIdAction,
  } = useContext(CheckoutContext);
  const {
    loaderState: [pageLoading],
  } = useContext(ProductContext);
  useEffect(() => {
    getOrderByIdAction(id);
  }, []);

  return (
    <>
      <Box px={1} my={1}>
        <Typography variant="h5" style={{ color: '#333', letterSpacing: '0.02em', fontWeight: 600 }} gutterBottom>
          ORDER {id}
        </Typography>
        {!pageLoading && order === DEFAULT.NOT_FOUND && (
          <Box p={2}>
            <Typography variant="body1" color="textSecondary" style={{ letterSpacing: '0.02em' }} gutterBottom>
              Order {DEFAULT.NOT_FOUND}
            </Typography>
          </Box>
        )}
      </Box>
      <Grid style={{ margin: '1rem 0' }} container spacing={3}>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            {order !== DEFAULT.NOT_FOUND && (
              <Grid item xs={12}>
                <ServiceHeader title="Shipping Details" type="primary" />
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  {order && !pageLoading ? `Name: ${order.name}` : <Skeleton height="20%" variant="text" />}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  {order && !pageLoading ? `Address: ${order.address}` : <Skeleton height="20%" variant="text" />}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  {order && !pageLoading ? `Phone No: ${order.phone_no}` : <Skeleton height="20%" variant="text" />}
                </Typography>
                {order && !pageLoading && (
                  <Alert style={{ margin: '1rem 0rem' }} severity={order.is_delivered ? 'success' : 'error'}>
                    {order.is_delivered ? 'Product is Delivered' : 'Product is not Delivered'}
                  </Alert>
                )}
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <ServiceHeader title="Payment Method" type="primary" />
                  <Typography variant="body1" color="textSecondary" gutterBottom>
                    {order && !pageLoading ? (
                      `Method: ${order.payment.method.toUpperCase()}`
                    ) : (
                      <Skeleton height="20%" variant="text" />
                    )}
                  </Typography>
                  {order && !pageLoading && (
                    <Alert style={{ margin: '1rem 0rem' }} severity={order.payment.isPaid ? 'success' : 'error'}>
                      {order.payment.isPaid ? `Paid on ${moment(order.payment.paidAt).format('LL')}` : 'Not Paid'}
                    </Alert>
                  )}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
        {order !== DEFAULT.NOT_FOUND && (
          <Grid item xs={12} md={6}>
            {order && !pageLoading && <OrderSummary cart={order.product_info} />}
          </Grid>
        )}
      </Grid>
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default CheckoutSuccess;
