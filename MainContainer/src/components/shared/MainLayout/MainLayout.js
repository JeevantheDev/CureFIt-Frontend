import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { AuthContext } from '../../../screens/authContainerScreen/context/auth.context';
import { Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { CONTAINER_ROUTES } from '../../../app/router/ApplicationRoutes';
import { ROLES } from '../../../app/entity/constant';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.secondary.main,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  linkText: {
    '& > span': {
      color: theme.palette.background.default,
      fontSize: '15px',
      lineHeight: '18px',
      textAlign: 'center',
      fontWeight: '500',
    },
  },
  activeLinkText: {
    color: theme.palette.primary.main,
    textAlign: 'center',
    '& > span': {
      fontSize: '15px',
      lineHeight: '18px',
      textAlign: 'center',
      fontWeight: '500',
    },
  },
  activeLink: {
    backgroundColor: `${theme.palette.background.default} !important`,
  },
  avatarCenter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '1rem 0',
  },
  avatarLarge: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  avatarText: {
    '& > span': {
      color: theme.palette.background.default,
      fontSize: '20px',
      lineHeight: '18px',
      textAlign: 'center',
    },
    '& > span:hover': {
      textDecoration: 'underline',
    },
    marginTop: '0.5rem',
    cursor: 'pointer',
  },
}));

export const MainLayout = (props) => {
  const { children, mobileOpenLeft, handleDrawerToggleLeft } = props;
  const classes = useStyles();
  const history = useHistory();

  const {
    userState: [loggedinUser],
    sidebarState: [sidebarPanel],
  } = useContext(AuthContext);

  const [selectedLink, setSelectedLink] = React.useState(0);

  const handleListItemClick = (event, linkIndex) => {
    setSelectedLink(linkIndex);
  };

  const routeUpdate = (userId) => {
    setSelectedLink(null);
    const userPath = `/private/${ROLES[loggedinUser.user_type].toLowerCase()}`;
    const updatePathByUser = CONTAINER_ROUTES.PRIVATE_UPDATE_ACCOUNT.replace('/private', userPath);
    const updatePathById = updatePathByUser.replace(':id', userId);
    history.push(updatePathById);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        <ListItemAvatar className={classes.avatarCenter}>
          <Avatar className={classes.avatarLarge} alt={loggedinUser.user_name} src={loggedinUser.avatar} />
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
            <ListItemText
              onClick={(e) => {
                e.stopPropagation();
                routeUpdate(loggedinUser._id);
              }}
              className={classes.avatarText}
              primary={loggedinUser.user_name}
            />
          </Box>
        </ListItemAvatar>
        <Divider style={{ margin: '1rem' }} />
        {sidebarPanel.map((panel, index) => (
          <ListItem
            selected={selectedLink === index}
            onClick={(event) => {
              handleListItemClick(event, index);
              history.push(panel.path);
            }}
            button
            className={selectedLink === index ? classes.activeLink : ''}
            key={index}
          >
            <ListItemText
              className={selectedLink === index ? classes.activeLinkText : classes.linkText}
              primary={panel.link}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={'left'}
            open={mobileOpenLeft}
            onClose={handleDrawerToggleLeft}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>{children}</main>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  mobileOpenLeft: PropTypes.bool.isRequired,
  handleDrawerToggleLeft: PropTypes.func.isRequired,
};
