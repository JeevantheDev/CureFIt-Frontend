import { Button, Divider, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

import { AppContext } from '../../app/context/app.context';
import { FormContext } from '../../app/context/form.context';
import { REVIEW_MODEL } from '../../app/entity/constant';
import { ReviewCard } from './ReviewCard/ReviewCard';
import { ReviewForm } from './ReviewForm/ReviewForm';

const useStyles = makeStyles((theme) => ({
  parent: {
    backgroundColor: theme.palette.background.paper,
    minWidth: '100%',
  },
  reviewHeader: {
    fontSize: '25px',
    lineHeight: '29px',
    letterSpacing: '0.07em',
  },
  buttonReview: {
    fontWeight: 'bold',
    textDecoration: 'underline',
    fontSize: '12px',
    lineHeight: '14px',
    letterSpacing: '0.07em',
    textTransform: 'capitalize',
  },
}));

export const Reviews = ({ loading, product }) => {
  const classes = useStyles();

  const {
    userState: [currentAuthUser],
  } = useContext(AppContext);

  const {
    editState: [isEditFlag, setIsEditFlag],
    formState: [formError, setFormError],
    reviewState: [selectedReview, setSelectedReview],
  } = useContext(FormContext);

  const handleOpenForm = () => {
    setIsEditFlag(false);
    setFormError('');
    setSelectedReview({
      review_title: '',
      review_desc: '',
      review_for: REVIEW_MODEL.PRODUCT,
      rating: 0,
    });
  };

  return (
    <Box className={`${classes.parent}`}>
      <Box px={1} width={'100%'} py={0.8} display="flex" justifyContent="space-between" alignItems="center">
        <Typography className={classes.reviewHeader} color="secondary" variant="h5" display="inline">
          Product Reviews{' '}
        </Typography>
        {((currentAuthUser && product && currentAuthUser._id !== product.user._id) || !currentAuthUser) && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              handleOpenForm();
            }}
            className={classes.buttonReview}
            color="primary"
          >
            Share Your Review
          </Button>
        )}
      </Box>
      <Divider />
      {selectedReview && (
        <Box p={2}>
          <ReviewForm cancelForm={() => setSelectedReview(null)} />
        </Box>
      )}
      <Box p={2}>
        {(loading || !product ? Array.from(new Array(2)) : product.reviews || []).map((review, idx) => (
          <React.Fragment key={idx}>
            {review ? (
              <ReviewCard review={review} />
            ) : (
              <Box display="flex" justifyContent="center" alignItems="start">
                <Box flex={0.2}>
                  <Skeleton variant="circle" width={50} height={50} />
                </Box>
                <Box ml={2} flex={0.8}>
                  <Skeleton variant="text" width={80} height={25} />
                  <Skeleton variant="text" width={500} height={25} />
                  <Skeleton variant="text" width={500} height={25} />
                  <Skeleton variant="text" width={50} height={25} />
                </Box>
              </Box>
            )}
          </React.Fragment>
        ))}
        {!loading && product && product.reviews.length === 0 && <Typography>No Reviews Found</Typography>}
      </Box>
      <Divider />
      {!loading && product && product.reviews.length > 0 && (
        <Box py={2} px={1}>
          <Button className={classes.buttonReview} color="primary">
            Show All Reviews
          </Button>
        </Box>
      )}
    </Box>
  );
};

Reviews.propTypes = {
  loading: PropTypes.bool.isRequired,
  product: PropTypes.any,
};
