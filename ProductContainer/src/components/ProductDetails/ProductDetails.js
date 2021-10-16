import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Divider, Chip, Button } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import StarIcon from '@material-ui/icons/Star';

const useStyles = makeStyles((theme) => ({
  parent: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    minWidth: '100%',
  },
  greenBackground: {
    backgroundColor: '#0EAC27',
    color: '#fff',
    width: '4rem',
    height: '2rem',
  },
}));

export const ProductDetails = React.memo(({ productDetails, loading }) => {
  const classes = useStyles();
  return (
    <Box className={classes.parent}>
      <Typography style={{ fontWeight: 'bold' }} variant="h4" color="textPrimary">
        {productDetails && !loading ? productDetails.product_title : <Skeleton height="20%" variant="text" />}{' '}
      </Typography>
      <Typography variant="caption" color="textSecondary" gutterBottom>
        {productDetails && !loading ? `(${productDetails.product_category})` : <Skeleton height="20%" variant="text" />}
      </Typography>
      <Typography style={{ fontWeight: 'bold' }} variant="overline" color="secondary" gutterBottom>
        Sold By {productDetails && !loading ? productDetails.user.user_name : <Skeleton height="20%" variant="text" />}
      </Typography>
      {productDetails && productDetails.reviews.length > 0 && (
        <Box display="flex" mb={2} alignItems="center">
          <Chip
            className={classes.greenBackground}
            label={productDetails.average_rating || 0.0}
            icon={<StarIcon style={{ color: '#fff' }} />}
          />
        </Box>
      )}
      <Divider style={{ marginBottom: '1rem' }} />
      <Typography variant="h5" style={{ color: '#333', letterSpacing: '0.02em', fontWeight: 600 }} gutterBottom>
        {productDetails && !loading ? productDetails.product_price : <Skeleton height="20%" variant="text" />}
      </Typography>
      <Button style={{ marginTop: '1rem', width: '50%' }} color="secondary" variant="contained" size="medium">
        Add to Cart
      </Button>
      <Divider style={{ marginTop: '1rem' }} />
      <Typography variant="h5" style={{ color: '#333', letterSpacing: '0.02em', fontWeight: 600 }} gutterBottom>
        {productDetails && !loading ? 'Description' : <Skeleton height="20%" variant="text" />}
      </Typography>
      <Typography variant="body1" color="textSecondary" style={{ letterSpacing: '0.02em' }} gutterBottom>
        {productDetails && !loading ? productDetails.product_desc : <Skeleton height="20%" variant="text" />}
      </Typography>
    </Box>
  );
});

ProductDetails.propTypes = {
  loading: PropTypes.bool.isRequired,
  productDetails: PropTypes.any,
};
