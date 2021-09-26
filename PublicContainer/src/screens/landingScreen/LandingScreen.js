import { Container } from '@material-ui/core';
import React from 'react';
import { SERVICES } from '../../app/entity/constant';
import { MiddleService } from '../../components/LandingPage/MiddleService/MiddleService';

import { TopBanner } from '../../components/LandingPage/TopBanner/TopBanner';

const LandingScreen = () => {
  return (
    <div>
      <TopBanner />
      <Container>
        <MiddleService services={SERVICES.LANDING.CONSULT} />
      </Container>
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default LandingScreen;
