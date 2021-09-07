import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  parent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    minWidth: '100%',
  },
  flexContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  serviceTitle: {
    fontWeight: 500,
    fontSize: '30px',
    lineHeight: '41px',
    textTransform: 'capitalize',
  },
}));

export const ServiceHeader = ({ children, type = 'secondary', title }) => {
  const classes = useStyles();
  return (
    <Box mb={2} className={`${classes.parent} ${classes.flexContainer}`}>
      <Typography className={classes.serviceTitle} color={type}>
        {title}
      </Typography>
      {children}
    </Box>
  );
};

ServiceHeader.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
};
