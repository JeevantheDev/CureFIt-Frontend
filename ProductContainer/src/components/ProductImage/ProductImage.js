import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  parent: {
    backgroundColor: theme.palette.background.default,
  },
  productImage: {
    width: 'auto',
    height: '15rem',
    objectFit: 'contain',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  subProductImage: {
    marginRight: '1rem',
  },
}));

export const ProductImage = React.memo(({ productImages, loading }) => {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="column">
      <Box className={classes.parent}>
        {productImages && !loading ? (
          <Box display="flex" p={4} justifyContent="center" alignItems="center" border={1} borderColor="#ccc">
            <Avatar
              variant="square"
              className={classes.productImage}
              alt="product-image"
              src={productImages[0] || ''}
            />
          </Box>
        ) : (
          <Skeleton variant="square" width={200} height={200} />
        )}
      </Box>
      <Box mt={2} display="flex" alignItems="center">
        {!productImages || loading
          ? Array.from(new Array(3))
          : productImages.map((image) => (
              <>
                {image ? (
                  <Avatar className={classes.subProductImage} variant="square" src={image} alt="product" />
                ) : (
                  <Skeleton className={classes.subProductImage} variant="square" width={60} height={60} />
                )}
              </>
            ))}
      </Box>
    </Box>
  );
});

ProductImage.propTypes = {
  loading: PropTypes.bool.isRequired,
  productImages: PropTypes.any,
};
