import { Box, Container } from '@material-ui/core';
import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ServiceTitle } from '../../ServiceTitle/ServiceTitle';
import { REVIEWS } from '../../../app/entity/constant';
import { Review } from './Review';

const useStyles = makeStyles((theme) => ({
  testimonialContainer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      height: 'auto',
    },
  },
  leftArrowBtn: {
    position: 'absolute',
    top: '55%',
    left: '-18px',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('xs')]: {
      left: '30px',
    },
  },
  rightArrowBtn: {
    position: 'absolute',
    top: '55%',
    right: '-18px',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('xs')]: {
      right: '30px',
    },
  },
  arrow: {
    width: '35px',
    height: '35px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  reviewContainer: {
    margin: '0 10rem',
    [theme.breakpoints.down('md')]: {
      margin: '0 4rem',
    },
  },
}));

export const Testimonials = () => {
  const classes = useStyles();
  const scrollRef = useRef(null);

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
  };

  return (
    <Box className={classes.testimonialContainer}>
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center">
          <ServiceTitle margin={false} title="What our users have to say" />
        </Box>
        <Box position="relative" display="flex" marginY={5}>
          <Box
            onClick={(e) => {
              e.stopPropagation();
              scroll(scrollRef.current.clientWidth);
            }}
            className={classes.rightArrowBtn}
          >
            <img
              className={classes.arrow}
              src={require('../../../assets/media/icons/right-arrow.png').default}
              alt="btn"
            />
          </Box>
          <Box className={classes.reviewContainer} ref={scrollRef}>
            {REVIEWS.slice(0, 1).map((review, idx) => (
              <Review key={idx} review={review} />
            ))}
          </Box>
          <Box
            onClick={(e) => {
              e.stopPropagation();
              scroll(-scrollRef.current.clientWidth);
            }}
            className={classes.leftArrowBtn}
          >
            <img
              className={classes.arrow}
              src={require('../../../assets/media/icons/left-arrow.png').default}
              alt="btn"
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
