import { Grid } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';

import { AppContext } from '../../../app/context/app.context';
import { INFO_TABS } from '../../../app/entity/constant';
import { ProfileDetails } from '../../../components/ProfileDetails/ProfileDetails';
import { ServiceHeader } from '../../../components/shared/ServiceHeader/ServiceHeader';
import { ProfileContext } from '../../profileScreen/context/profile.context';

const Profile = () => {
  const {
    loaderState: [pageLoading],
    fetchProfileById,
  } = useContext(ProfileContext);

  const {
    userState: [currentAuthUser],
  } = useContext(AppContext);

  useEffect(() => {
    currentAuthUser.profile && fetchProfileById(currentAuthUser.profile.id);
  }, []);

  return (
    <div>
      <ServiceHeader title="Your Profile Details" />
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <ProfileDetails
            isEdit={true}
            infoTabLabel={INFO_TABS.label.slice(1)}
            infoTabPanel={INFO_TABS.panels.slice(1)}
            isLoading={pageLoading}
          />
        </Grid>
      </Grid>
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default Profile;
