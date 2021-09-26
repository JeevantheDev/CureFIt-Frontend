import React, { useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ServiceTitle } from '../../ServiceTitle/ServiceTitle';
import { ProfileContext } from '../../../screens/profileScreen/context/profile.context';

const useStyles = makeStyles((theme) => ({
  serviceContainer: {
    height: '25rem',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    position: 'relative',
    transition: 'all 0.2s ease',
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
      top: '65%',
    },
  },
  rightArrowBtn: {
    position: 'absolute',
    top: '55%',
    right: '-18px',
    marginLeft: 'auto',
    marginRight: 'auto',
    [theme.breakpoints.down('xs')]: {
      top: '65%',
    },
  },
  arrow: {
    width: '35px',
    height: '35px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  marginRight: {
    marginRight: theme.spacing(10),
    '&:last-child': {
      marginRight: theme.spacing(0),
    },
    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(10),
      marginRight: '55px',
      '&:last-child': {
        marginRight: '55px',
      },
    },
  },
  horizontalScroll: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflowY: 'hidden',
    overflowX: 'scroll',
    whiteSpace: 'nowrap',
    '&::-webkit-scrollbar': {
      overflow: 'hidden',
    },
  },
  serviceImage: {
    width: 200,
    height: 200,
  },

  serviceText: {
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  },
}));
export const MiddleService = ({ services, type = 'specalists' }) => {
  const classes = useStyles();
  const { setPublicFilterQuery } = useContext(ProfileContext);
  const scrollRef = useRef(null);
  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
  };

  const proceedService = ({ type, value }) => {
    setPublicFilterQuery({ [type]: value });
  };
  return (
    <Box className={classes.serviceContainer}>
      <ServiceTitle
        title="Consult top doctors in any specialists"
        subTitle="Book your appointment with doctors in all specialists"
      />
      <Box
        onClick={(e) => {
          e.stopPropagation();
          scroll(scrollRef.current.clientWidth);
        }}
        className={classes.rightArrowBtn}
      >
        <img className={classes.arrow} src={require('../../../assets/media/icons/right-arrow.png').default} alt="btn" />
      </Box>
      <Box ref={scrollRef} className={classes.horizontalScroll}>
        {services.map((service, idx) => (
          <Box className={classes.marginRight} key={idx}>
            <img className={classes.serviceImage} src={service.image.default} alt="service-img" />
            <Typography
              onClick={(e) => {
                e.stopPropagation();
                proceedService({ type, value: service.value });
              }}
              className={classes.serviceText}
              align="center"
              color="textSecondary"
            >
              {service.label}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box
        onClick={(e) => {
          e.stopPropagation();
          scroll(-scrollRef.current.clientWidth);
        }}
        className={classes.leftArrowBtn}
      >
        <img className={classes.arrow} src={require('../../../assets/media/icons/left-arrow.png').default} alt="btn" />
      </Box>
    </Box>
  );
};

MiddleService.propTypes = {
  type: PropTypes.string,
  services: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
