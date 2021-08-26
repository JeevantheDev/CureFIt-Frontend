import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import DocShowcase from '../../assets/media/doc-showcase.svg';
import { Divider, makeStyles, Typography } from '@material-ui/core';
import { NavLink as RouterLink } from 'react-router-dom';
import { AUTH_APPLICATION_URL } from '../../app/router/ApplicationRoutes';

const useStyles = makeStyles((theme) => ({
  layoutParent: {
    backgroundColor: theme.palette.background.paper,
    borderColor: theme.palette.background.paper,
    '&:nth-child(1)': {
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  },
  activeLink: {
    padding: '0.3rem',
    color: `${theme.palette.secondary.main} !important`,
    borderColor: theme.palette.primary.main,
    borderBottomStyle: 'solid',
    borderBottom: theme.spacing(1),
  },

  linkText: {
    color: theme.palette.primary.main,
    fontSize: '23px',
    lineHeight: '29px',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
}));

export const AuthLayout = ({ children }) => {
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent="center" maxWidth={'100vw'} height={'100vh'}>
      <Box px={5} className={classes.layoutParent} display="flex" flexDirection="column" justifyContent="center">
        <img src={DocShowcase} alt="Doc showcase" />
      </Box>
      <Box
        className={`${classes.layoutParent}`}
        borderLeft={2}
        borderRight={2}
        display="flex"
        flexDirection="column"
        width={'100%'}
      >
        <Box flex={0.1} p={0.5} display="flex" justifyContent="space-evenly" alignItems="flex-end">
          <Box p={0.8}>
            <Typography
              to={AUTH_APPLICATION_URL.AUTH_SIGNIN}
              activeClassName={classes.activeLink}
              component={RouterLink}
              align="center"
              className={`${classes.linkText}`}
            >
              Login
            </Typography>
          </Box>
          <Box p={0.8}>
            <Typography
              to={AUTH_APPLICATION_URL.AUTH_SIGNUP}
              component={RouterLink}
              activeClassName={classes.activeLink}
              align="center"
              className={`${classes.linkText}`}
            >
              Signup
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box flex={0.9} p={1} display="flex" justifyContent="center">
          {children}
        </Box>
      </Box>
    </Box>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
