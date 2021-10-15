import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { CONTAINER_ROUTES } from '../../app/router/ApplicationRoutes';
import { AuthContext } from '../../screens/authContainerScreen/context/auth.context';
import { USER_TYPE } from '../../app/entity/constant';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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
  const {
    tokenState: [token],
    userState: [loggedinUser],
    signout,
  } = useContext(AuthContext);

  const history = useHistory();

  const [redirectPath, setRedirectPath] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const currentUserType = () => {
    const userType = loggedinUser?.user_type;
    return userType;
  };

  useEffect(() => {
    setAnchorEl(null);
    if (currentUserType() === USER_TYPE.ADMIN) {
      setRedirectPath(CONTAINER_ROUTES.PRIVATE_ADMIN);
    } else if (currentUserType() === USER_TYPE.DOCTOR) {
      setRedirectPath(CONTAINER_ROUTES.PRIVATE_DOCTOR_DASHBOARD);
    } else if (currentUserType() === USER_TYPE.SELLER) {
      setRedirectPath(CONTAINER_ROUTES.PRIVATE_SELLER);
    } else if (currentUserType() === USER_TYPE.USER) {
      setRedirectPath(CONTAINER_ROUTES.PRIVATE_USER);
    } else {
      setRedirectPath(CONTAINER_ROUTES.AUTH_SIGNIN_CONTAINER);
    }
  }, [currentUserType()]);

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
            to={CONTAINER_ROUTES.PRODUCT_CONTAINER_ALL}
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
        component={!token ? RouterLink : Button}
        onClick={token && handleClick}
        className={`${classes.link}`}
        to={!token ? CONTAINER_ROUTES.AUTH_SIGNIN_CONTAINER : '*'}
        variant="outlined"
        aria-controls="simple-menu"
        aria-haspopup="true"
      >
        <Typography display="block" variant="caption" color="primary">
          {!token ? 'Login / Signup' : 'Account'}
        </Typography>
      </Button>
      {token && anchorEl && (
        <Menu
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            style={{ backgroundColor: '#fff' }}
            onClick={(event) => {
              history.push(redirectPath);
              handleClose(event);
            }}
          >
            My account
          </MenuItem>
          <MenuItem style={{ backgroundColor: '#fff' }} onClick={() => signout()}>
            Logout
          </MenuItem>
        </Menu>
      )}
    </>
  );
};
