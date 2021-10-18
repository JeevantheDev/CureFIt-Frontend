import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  parent: {
    backgroundColor: theme.palette.background.paper,
  },
  productImage: {
    width: 'auto',
    height: '15rem',
    objectFit: 'contain',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  pointer: { cursor: 'pointer' },
  subProductImage: {
    marginRight: '1rem',
  },
}));

export const ProductImage = React.memo(({ productImages, loading }) => {
  const classes = useStyles();
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    setActiveImage(productImages && productImages.length > 0 ? productImages[0] : '');
  }, [productImages]);
  return (
    <Box display="flex" flexDirection="column">
      <Box className={classes.parent}>
        {productImages && !loading ? (
          <Box display="flex" p={4} justifyContent="center" alignItems="center">
            <Avatar variant="square" className={classes.productImage} alt="product-image" src={activeImage} />
          </Box>
        ) : (
          <Box display="flex" p={4} justifyContent="center" alignItems="center">
            <Skeleton variant="square" width={200} height={200} />
          </Box>
        )}
      </Box>
      <Box mt={2} display="flex" alignItems="center" flexWrap={'wrap'}>
        {!productImages || loading
          ? Array.from(new Array(3))
          : productImages.map((image) => (
              <React.Fragment key={image}>
                {image ? (
                  <Box
                    mb={1}
                    className={classes.pointer}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImage(image);
                    }}
                  >
                    <Avatar className={classes.subProductImage} variant="square" src={image} alt="product" />
                  </Box>
                ) : (
                  <Skeleton className={classes.subProductImage} variant="square" width={60} height={60} />
                )}
              </React.Fragment>
            ))}
      </Box>
    </Box>
  );
});

ProductImage.propTypes = {
  loading: PropTypes.bool.isRequired,
  productImages: PropTypes.any,
};
