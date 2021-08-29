import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { TabPanel, a11yProps } from '../shared/TabPanel/TabPanel';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
  parent: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: '100%',
  },

  activeTabBackground: {
    backgroundColor: theme.palette.background.paper,
  },
  tablabelWidth: {
    minWidth: '120px',
  },
  tabPanelWidth: {
    minWidth: '100%',
  },
  notActiveTabBackground: {
    backgroundColor: theme.palette.background.default,
  },
}));

export const ProfileDetails = ({ isLoading, isEdit, infoTabLabel, infoTabPanel }) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box className={`${classes.parent}`}>
      <AppBar position="static" elevation={0} position="static" color="transparent">
        <Tabs
          value={value}
          indicatorColor="none"
          textColor="secondary"
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {(isLoading ? Array.from(new Array(4)) : infoTabLabel).map((service, idx) => (
            <Tab
              className={`${classes.tablabelWidth} ${
                value === idx ? classes.activeTabBackground : classes.notActiveTabBackground
              }`}
              wrapped={true}
              key={idx}
              label={
                service ? (
                  <Typography
                    color={value === idx ? 'secondary' : 'primary'}
                    variant="body2"
                    style={{ fontWeight: 'bold' }}
                  >
                    {service}
                  </Typography>
                ) : (
                  <Skeleton variant="rect" width="50%" />
                )
              }
              {...a11yProps(idx)}
            />
          ))}
        </Tabs>
      </AppBar>
      {(isLoading ? Array.from(new Array(4)) : infoTabPanel).map((Panel, idx) => (
        <TabPanel
          className={`${classes.tabPanelWidth} ${
            value === idx ? classes.activeTabBackground : classes.notActiveTabBackground
          }`}
          value={value}
          index={idx}
        >
          {Panel ? <Panel isEdit={isEdit} /> : <Skeleton variant="rect" width="50%" />}
        </TabPanel>
      ))}
    </Box>
  );
};

ProfileDetails.propTypes = {
  isEdit: PropTypes.bool.isRequired,
  infoTabLabel: PropTypes.array.isRequired,
  infoTabPanel: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
