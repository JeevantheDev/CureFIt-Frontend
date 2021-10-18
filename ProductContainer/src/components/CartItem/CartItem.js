import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({}));

export const CartItem = ({ product, children }) => {
  const classes = useStyles();
  return (
    <Box display="flex" flexWrap="wrap" justifyContent="center" alignItems="center" my={3}>
      <Box flex={0.2}>
        <Avatar
          style={{ width: '5rem', height: '5rem' }}
          variant="square"
          src={product.product_image[0]}
          alt="product image"
        />
      </Box>
      <Box flex={0.8}>
        <Typography style={{ fontWeight: 'bold' }} variant="h5" color="textPrimary" gutterBottom>
          {product.product_title}
        </Typography>
        <Typography variant="button" color="textSecondary" gutterBottom>
          {product.user.user_name}
        </Typography>
      </Box>
      <Box flex={0.2}>
        <Typography variant="h5" style={{ color: '#333', letterSpacing: '0.02em', fontWeight: 600 }} gutterBottom>
          {product.product_price}
        </Typography>
        {children}
      </Box>
    </Box>
  );
};

CartItem.propTypes = {
  product: PropTypes.any,
  children: PropTypes.node.isRequired,
};
