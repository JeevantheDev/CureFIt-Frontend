import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { CONTAINER_ROUTES } from '../../app/router/ApplicationRoutes';

const useStyles = makeStyles((theme) => ({
  subTitle: {
    flexGrow: 1,
    fontWeight: '600 !important',
    textDecoration: 'none',
    display: 'block',
    color: '#333',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
  link: {
    margin: theme.spacing('auto', 2),
  },
  mYauto: {
    margin: 'auto 0',
  },
  subText: {
    fontWeight: '300',
    fontSize: '12px',
    lineHeight: '14px',
    color: '#979797',
  },
}));

export const AppbarMenu = ({ column = false }) => {
  const classes = useStyles();
  return (
    <>
      <Box display="flex" flexDirection={column ? 'column' : 'row'} justifyContent="center" ml={4} mr={8}>
        <Box mr={column ? 0 : 8}>
          <Typography
            component={RouterLink}
            to={CONTAINER_ROUTES.PUBLIC_CONTAINER_PROFILES}
            variant="h6"
            className={classes.subTitle}
          >
            Doctors
          </Typography>
          <span className={classes.subText}>Book an appointment</span>
        </Box>
        <Box>
          <Typography
            component={RouterLink}
            to={CONTAINER_ROUTES.PUBLIC_CONTAINER_PRODUCTS}
            variant="h6"
            className={classes.subTitle}
          >
            Pharamcy
          </Typography>
          <span className={classes.subText}>Medcines and Health Product</span>
        </Box>
      </Box>
      <Button
        color="secondary"
        component={RouterLink}
        className={`${classes.link}`}
        to={CONTAINER_ROUTES.AUTH_SIGNIN_CONTAINER}
        variant="outlined"
      >
        <Typography display="block" variant="caption" color="primary">
          Login / Signup
        </Typography>
      </Button>
    </>
  );
};
