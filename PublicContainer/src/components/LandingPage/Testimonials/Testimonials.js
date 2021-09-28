import { Box, Container } from '@material-ui/core';
import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ServiceTitle } from '../../ServiceTitle/ServiceTitle';
import { REVIEWS } from '../../../app/entity/constant';
import { Review } from './Review';

const useStyles = makeStyles((theme) => ({
  testimonialContainer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    padding: '2rem 0',
    position: 'relative',
    height: '24rem',
    [theme.breakpoints.down('md')]: {
      height: 'auto',
    },
  },
  leftArrowBtn: {
    position: 'absolute',
    top: '20%',
    left: '-18px',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('xs')]: {
      left: '30px',
    },
  },
  rightArrowBtn: {
    position: 'absolute',
    top: '20%',
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
  dots: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    marginRight: theme.spacing(1),
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

export const Testimonials = () => {
  const classes = useStyles();
  const scrollRef = useRef(null);

  const [activeIdx, setActiveIdx] = useState(0);

  const scroll = (scrollOffset, type) => {
    scrollRef.current.scrollLeft += scrollOffset;
    setActiveIdx((prevIdx) =>
      prevIdx < REVIEWS.length - 1 ? (type === 'right' ? prevIdx + 1 : 0) : type === 'left' ? prevIdx - 1 : 0,
    );
  };

  return (
    <Box className={classes.testimonialContainer}>
      <Container>
        <Box display="flex" justifyContent="center" alignItems="center">
          <ServiceTitle margin={false} title="What our users have to say" />
        </Box>
        <Box position="relative" display="flex" marginY={5}>
          {activeIdx < REVIEWS.length - 1 && (
            <Box
              onClick={(e) => {
                e.stopPropagation();
                scroll(scrollRef.current.clientWidth, 'right');
              }}
              className={classes.rightArrowBtn}
            >
              <img
                className={classes.arrow}
                src={require('../../../assets/media/icons/right-arrow.png').default}
                alt="btn"
              />
            </Box>
          )}
          <Box className={classes.reviewContainer} ref={scrollRef}>
            <Review review={REVIEWS[activeIdx]} />
            <Box display="flex" justifyContent="center" alignItems="center">
              {REVIEWS.map((review, idx) => (
                <div
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveIdx(idx);
                  }}
                  style={{ backgroundColor: idx === activeIdx ? '#EE6F57' : '#004071' }}
                  className={classes.dots}
                ></div>
              ))}
            </Box>
          </Box>
          {activeIdx > 0 && (
            <Box
              onClick={(e) => {
                e.stopPropagation();
                scroll(-scrollRef.current.clientWidth, 'left');
              }}
              className={classes.leftArrowBtn}
            >
              <img
                className={classes.arrow}
                src={require('../../../assets/media/icons/left-arrow.png').default}
                alt="btn"
              />
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};
