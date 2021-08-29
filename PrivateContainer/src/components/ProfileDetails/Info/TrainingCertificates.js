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

export const TrainingCertificates = ({ isEdit }) => {
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
            <span>Add T&C</span>
          </Button>
        </Box>
      )}
      {currentProfile && (
        <ul className={classes.serviceList}>
          {currentProfile.training_certificates && currentProfile.training_certificates.length > 0 ? (
            currentProfile.training_certificates.map((training, idx) => (
              <li className={`${classes.boldText} ${classes.subText}`} key={idx}>
                {training.name}, {training.year}
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
            <p className={`${classes.boldText} ${classes.subText}`}>No Training & Certificates Found.</p>
          )}
        </ul>
      )}
    </Box>
  );
};

TrainingCertificates.propTypes = {
  isEdit: PropTypes.bool.isRequired,
};
