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

export const Experiences = () => {
  const classes = useStyles();
  const {
    profileState: [currentProfile],
  } = useContext(ProfileContext);

  return (
    <>
      {currentProfile && (
        <ul className={classes.serviceList}>
          {currentProfile.experience.length > 0 ? (
            currentProfile.experience.map((exp, idx) => (
              <li className={`${classes.boldText} ${classes.subText}`} key={idx}>
                {exp.work_place}, {exp.position}, {exp.year}
              </li>
            ))
          ) : (
            <p className={`${classes.boldText} ${classes.subText}`}>No Experiences Found.</p>
          )}
        </ul>
      )}
    </>
  );
};
