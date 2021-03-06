import React, { useContext, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';
import { CustomTableLists } from '../../../components/CustomTableLists/CustomTableLists';
import { ServiceHeader } from '../../../components/shared/ServiceHeader/ServiceHeader';
import { AppContext } from '../../../app/context/app.context';
import { TABLE_ROWS } from '../../../app/entity/constant';
import { UserContext } from '../context/user.context';
import { OrdersList } from '../../../components/CustomTableLists/OrdersList/OrdersList';

const Orders = () => {
  const {
    userState: [currentAuthUser],
  } = useContext(AppContext);
  const { getOrdersByUserAction } = useContext(UserContext);

  const [name, setName] = useState('');
  useEffect(() => {
    getOrdersByUserAction({ by_user: `${currentAuthUser._id}`, name });
  }, [name]);

  const handleKeyEnter = (event) => {
    event.preventDefault();
    if (event.key !== 'Enter') return;
    setName(event.target.value);
  };

  return (
    <div>
      <ServiceHeader title="Your Orders">
        <TextField
          size="small"
          variant="outlined"
          color="secondary"
          placeholder="search name"
          onKeyUp={handleKeyEnter}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="secondary" />
              </InputAdornment>
            ),
          }}
        />
      </ServiceHeader>
      <CustomTableLists tableRows={TABLE_ROWS.ORDER_LIST}>
        <OrdersList />
      </CustomTableLists>
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default Orders;
