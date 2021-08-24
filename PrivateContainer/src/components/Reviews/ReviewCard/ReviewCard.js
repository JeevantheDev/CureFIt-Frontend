import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import StarIcon from '@material-ui/icons/Star';

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
  return (
    <Box mt={2} display="flex" justifyContent="start" alignItems="start">
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
    </Box>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.any,
};
