import React from 'react';
import { USER_TYPE } from '../../../app/entity/constant';
import { withUserType } from '../../../app/hoc/withUserType';

const Dashboard = () => {
  return <div>Seller Dashboard</div>;
};

// eslint-disable-next-line import/no-default-export
export default withUserType(Dashboard)(USER_TYPE.SELLER);
