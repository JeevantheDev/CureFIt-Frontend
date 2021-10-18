import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  menu: {
    width: '30ch',
  },
  margin: {
    marginBottom: '3rem',
  },
  title: {
    fontSize: '30px',
    fontWeight: '600',
    lineHeight: '67px',
    letterSpacing: '0.01em',
    [theme.breakpoints.down('md')]: {
      lineHeight: '60px',
      textAlign: 'center',
    },
  },
  subTitle: {
    fontFamily: 'Roboto-Regular',
    fontWeight: 300,
    fontSize: '15px',
    lineHeight: '23px',
    letterSpacing: '0.15rem',
  },
}));

export const ServiceTitle = ({ title, subTitle, children, margin = true }) => {
  const classes = useStyles();
  return (
    <Box className={margin ? classes.margin : ''}>
      <Typography data-testid="primary-title" className={classes.title} align="left" variant="h6" color="textPrimary">
        {title}
      </Typography>
      <Typography
        data-testid="primary-subtitle"
        className={classes.subTitle}
        align="left"
        variant="body2"
        gutterBottom
        color="textSecondary"
      >
        {subTitle}
      </Typography>
    </Box>
  );
};

ServiceTitle.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  margin: PropTypes.bool,
};
