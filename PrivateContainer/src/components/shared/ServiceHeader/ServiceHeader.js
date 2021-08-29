import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  parent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
    minWidth: '100%',
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
    <Box display="flex" mb={2} justifyContent="space-between" alignItems="center" className={classes.parent}>
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
