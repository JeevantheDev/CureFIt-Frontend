import { Button } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import moment from 'moment';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { PRIVATE_APPLICATION_URL } from '../../../app/router/ApplicationRoutes';
import { ProfileContext } from '../../../screens/profileScreen/context/profile.context';
import { UserContext } from '../../../screens/userScreen/context/user.context';
import { CustomTableCell } from '../CustomTableCell';
import { CustomTableRow } from '../CustomTableRow';

export const OrdersList = () => {
  const history = useHistory();
  const {
    loaderState: [pageLoading],
  } = useContext(ProfileContext);
  const {
    orderState: [orders],
  } = useContext(UserContext);

  return (
    <>
      {!pageLoading && orders && orders.length === 0 && <p>No Orders Found</p>}
      {(pageLoading || !orders ? Array.from(new Array(10)) : orders).map((order, idx) => (
        <CustomTableRow key={order ? order.id : idx}>
          <CustomTableCell>{order ? order.name : <Skeleton variant="text" width={100} height={20} />}</CustomTableCell>
          <CustomTableCell>
            {order ? order.location.city : <Skeleton variant="text" width={100} height={20} />}
          </CustomTableCell>
          <CustomTableCell>
            {order ? order.location.country : <Skeleton variant="text" width={100} height={20} />}
          </CustomTableCell>
          <CustomTableCell>
            {order ? order.phone_no : <Skeleton variant="text" width={100} height={20} />}
          </CustomTableCell>
          <CustomTableCell>
            {order ? order.total_qty : <Skeleton variant="text" width={100} height={20} />}
          </CustomTableCell>
          <CustomTableCell>
            {order ? `₹ ${order.payment.total_price}` : <Skeleton variant="text" width={100} height={20} />}
          </CustomTableCell>
          <CustomTableCell>
            {order ? moment(order.created_at).format('ll') : <Skeleton variant="text" width={100} height={20} />}
          </CustomTableCell>
          <CustomTableCell>
            {order ? moment(order.delivery_estimate).format('ll') : <Skeleton variant="text" width={100} height={20} />}
          </CustomTableCell>
          <CustomTableCell>
            {order ? order.is_delivered ? 'Yes' : 'No' : <Skeleton variant="text" width={100} height={20} />}
          </CustomTableCell>
          <CustomTableCell>
            {order ? (
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  history.push(PRIVATE_APPLICATION_URL.PRODUCT_CHECKOUT_SUCCESS_ID.replace(':id', order.id));
                }}
                color="secondary"
                variant="text"
              >
                View
              </Button>
            ) : (
              <Skeleton variant="text" width={100} height={20} />
            )}
          </CustomTableCell>
        </CustomTableRow>
      ))}
    </>
  );
};
