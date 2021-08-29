import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ProfileContext } from '../../../screens/profileScreen/context/profile.context';
import { makeStyles } from '@material-ui/core/styles';
import { Box, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { AppContext } from '../../../app/context/app.context';

const useStyles = makeStyles((theme) => ({
  serviceList: { padding: '0 1rem', maxHeight: '15rem', display: 'flex', flexDirection: 'column', flexWrap: 'wrap' },
  subText: {
    fontWeight: '300',
    fontSize: '18px',
    lineHeight: '30px',
    letterSpacing: '0.08em',
    color: '#455A64',
  },
  boldText: {
    fontWeight: 'bold',
  },
}));

export const Experiences = ({ isEdit }) => {
  const classes = useStyles();
  const {
    profileState: [currentProfile],
  } = useContext(ProfileContext);

  const {
    tokenState: [currentToken],
  } = useContext(AppContext);

  return (
    <Box display="flex" flexDirection="column">
      {currentToken && isEdit && (
        <Box mb={1} ml={'auto'}>
          <Button variant="text" startIcon={<AddIcon />} color="primary">
            <span>Add Experience</span>
          </Button>
        </Box>
      )}
      {currentProfile && (
        <ul className={classes.serviceList}>
          {currentProfile.experience && currentProfile.experience.length > 0 ? (
            currentProfile.experience.map((exp, idx) => (
              <li className={`${classes.boldText} ${classes.subText}`} key={idx}>
                {exp.work_place}, {exp.position}, {exp.year}
                {currentToken && isEdit && (
                  <>
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </li>
            ))
          ) : (
            <p className={`${classes.boldText} ${classes.subText}`}>No Experiences Found.</p>
          )}
        </ul>
      )}
    </Box>
  );
};

Experiences.propTypes = {
  isEdit: PropTypes.bool.isRequired,
};
