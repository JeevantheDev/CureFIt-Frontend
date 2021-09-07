import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Container } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { CONTAINER_ROUTES } from '../../app/router/ApplicationRoutes';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { AppbarMenu } from './AppbarMenu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: 300,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  title: {
    flexGrow: 1,
    textDecoration: 'none',
    display: 'block',
  },
  appBar: {
    borderBottom: `2px solid ${theme.palette.divider}`,
    zIndex: theme.zIndex.drawer + 1,
  },
  drawerPaper: {
    width: 300,
    backgroundColor: '#fff',
  },
}));

export const Header = ({ window }) => {
  const classes = useStyles();
  const [mobileOpenLeft, setMobileOpenLeft] = React.useState(false);
  const [mobileOpenRight, setMobileOpenRight] = useState(false);

  const handleDrawerToggleRight = () => {
    setMobileOpenRight(!mobileOpenRight);
  };

  const handleDrawerToggleLeft = () => {
    setMobileOpenLeft(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" color="default" elevation={0} className={classes.appBar}>
        <Container>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggleLeft}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component={RouterLink}
              to={CONTAINER_ROUTES.PUBLIC_CONTAINER}
              variant="h4"
              color="primary"
              className={`${classes.title}`}
            >
              CureFit
            </Typography>
            <Hidden smDown>
              <AppbarMenu />
            </Hidden>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggleRight}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            container={window !== undefined ? () => window().document.body : undefined}
            variant="temporary"
            anchor={'right'}
            open={mobileOpenRight}
            onClose={handleDrawerToggleRight}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <AppbarMenu column={true} />
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};
