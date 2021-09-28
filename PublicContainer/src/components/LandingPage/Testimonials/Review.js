import { Avatar, Box, Typography } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  reviewText: {
    fontWeight: 100,
    fontSize: '20px',
    lineHeight: '35px',
    letterSpacing: '0.08em',
    color: '#455A64',
    textAlign: 'center',
  },
  reviewName: {
    fontWeight: 'bold',
    fontSize: '15px',
    lineHeight: '18px',
    letterSpacing: '0.08em',
    color: '#000',
    marginLeft: '1rem',
  },

  dots: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
  },
}));

export const Review = ({ review }) => {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <Typography className={classes.reviewText}>{review.text}</Typography>
      <Box my={3} display="flex" alignItems="center">
        <Avatar src={review.avatar.default} />
        <Typography className={classes.reviewName}>{review.name}</Typography>
      </Box>
    </Box>
  );
};
