import { Grid } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { AppContext } from '../../../app/context/app.context';
import { FormContext } from '../../../app/context/form.context';
import { PAYMENT_METHOD } from '../../../app/entity/constant';
import { CardForm } from '../../../components/CardForm/CardForm';

import { OrderSummary } from '../../../components/OrderSummary/OrderSummary';
import { ShippingForm } from '../../../components/ShippingForm/ShippingForm';
import { CheckoutContext } from '../context/checkout.context';

const Checkout = (props) => {
  const {
    userState: [currentAuthUser],
  } = useContext(AppContext);
  const {
    formState: [formError, setFormError],
  } = useContext(FormContext);
  const {
    cartState: [cart],
    calculateAmount,
  } = useContext(CheckoutContext);

  const [shippingObj, setShippingObj] = useState(null);

  const shippingSubmit = (formObj) => {
    setFormError('');
    if (formObj) {
      const { ...obj } = formObj;
      obj.total_qty = cart.length;
      obj.product_info = cart.reduce((res, item) => {
        res.push(item.id);
        return res;
      }, []);
      obj.payment = {
        method: obj.payment_method,
        result: { email_address: currentAuthUser.user_email },
        total_price: calculateAmount(),
      };
      obj.delivery_estimate = new Date(new Date().setDate(new Date().getDate() + 7)).toDateString(); // get 7th date from now
      setShippingObj(obj);
    } else {
      setFormError('FILL ALL THE FIELDS');
    }
  };

  const submitCard = (payload) => {
    const { ...obj } = shippingObj;
    obj.payment = {
      ...obj.payment,
      result: { ...obj.payment.result, id: payload.id },
      isPaid: true,
      paidAt: new Date(payload.created).toDateString(),
    };
  };

  return (
    <Grid style={{ margin: '2rem 0' }} container spacing={3}>
      <Grid item xs={12} md={6}>
        <ShippingForm onSubmit={shippingSubmit} />
        {shippingObj && shippingObj.payment.method === PAYMENT_METHOD.CARD && <CardForm submitCard={submitCard} />}
      </Grid>
      <Grid item xs={12} md={6}>
        <OrderSummary />
      </Grid>
    </Grid>
  );
};

// eslint-disable-next-line import/no-default-export
export default Checkout;
