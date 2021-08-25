import React, { useContext } from 'react';
import { ProfileContext } from '../../../screens/profileScreen/context/profile.context';
import { makeStyles } from '@material-ui/core/styles';

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

export const Educations = () => {
  const classes = useStyles();
  const {
    profileState: [currentProfile],
  } = useContext(ProfileContext);
  return (
    <>
      {currentProfile && (
        <ul className={classes.serviceList}>
          {currentProfile.education && currentProfile.education.length > 0 ? (
            currentProfile.education.map((edu, idx) => (
              <li className={`${classes.boldText} ${classes.subText}`} key={idx}>
                {edu.degree}, {edu.college}, {edu.year}
              </li>
            ))
          ) : (
            <p className={`${classes.boldText} ${classes.subText}`}>No Educations Found</p>
          )}
        </ul>
      )}
    </>
  );
};
