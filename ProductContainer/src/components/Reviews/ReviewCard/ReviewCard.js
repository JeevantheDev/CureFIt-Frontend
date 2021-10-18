import { Box, makeStyles, Typography, IconButton } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Chip from '@material-ui/core/Chip';
import StarIcon from '@material-ui/icons/Star';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { AppContext } from '../../../app/context/app.context';
// import { UserContext } from '../../../screens/userScreen/context/user.context';
import { FormContext } from '../../../app/context/form.context';

const useStyles = makeStyles((theme) => ({
  userText: {
    fontWeight: 'bold',
    fontSize: '12px',
    lineHeight: '10px',
    letterSpacing: '0.1em',
    color: '#555',
    marginBottom: '20px',
  },
  reviewTitle: {
    fontSize: '20px',
    lineHeight: '22px',
    letterSpacing: '0.01em',
    marginBottom: '20px',
  },
  reviewDesc: {
    fontWeight: 300,
    fontSize: '15px',
    lineHeight: '22px',
    letterSpacing: '0.01em',
    marginBottom: '20px',
  },
  greenChip: {
    backgroundColor: '#0EAC27',
    color: '#fff',
  },
}));

export const ReviewCard = ({ review }) => {
  const classes = useStyles();
  const {
    userState: [currentAuthUser],
  } = useContext(AppContext);
  const {
    editState: [isEditFlag, setIsEditFlag],
    formState: [formError, setFormError],
    reviewState: [selectedReview, setSelectedReview],
  } = useContext(FormContext);
  // const { deleteReviewAction } = useContext(UserContext);

  const handleUpdateReview = (reviewObj) => {
    setIsEditFlag(true);
    setFormError('');
    setSelectedReview(reviewObj);
  };

  const handleDeleteReview = (reviewId) => {
    // confirm('Are you sure ?') && deleteReviewAction(reviewId);
  };

  return (
    <Box mt={2} display="flex" justifyContent="start" alignItems="start">
      {review ? (
        <>
          <Box>
            <Avatar>{review.user.user_name[0]}</Avatar>
          </Box>
          <Box ml={3}>
            <Typography className={classes.userText} gutterBottom>
              {review.user.user_name}
            </Typography>
            <Typography color="textPrimary" className={classes.reviewTitle} gutterBottom>
              {review.review_title}
            </Typography>
            <Typography color="textSecondary" className={classes.reviewDesc} gutterBottom>
              {review.review_desc}
            </Typography>
            <Chip
              className={classes.greenChip}
              label={review.rating || 0.0}
              icon={<StarIcon style={{ color: '#fff' }} />}
            />
          </Box>
          {currentAuthUser._id === review.user_id && (
            <div style={{ marginLeft: 'auto' }}>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdateReview(review);
                }}
                color="primary"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteReview(review._id);
                }}
                color="secondary"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          )}
        </>
      ) : (
        <Typography color="textPrimary" className={classes.reviewTitle} gutterBottom>
          No Reviews Found
        </Typography>
      )}
    </Box>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.any,
};
