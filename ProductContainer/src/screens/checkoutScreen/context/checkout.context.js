import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { placeOrder, getOrderById } from '../../../app/api/product.api';
import { FormContext } from '../../../app/context/form.context';
import { DEFAULT } from '../../../app/entity/constant';
import { ProductContext } from '../../productScreen/context/product.context';
export const CheckoutContext = React.createContext();

const CheckoutProvider = ({ children }) => {
  const {
    loaderState: [submitLoader, setSubmitLoader],
    formState: [formError, setFormError],
  } = useContext(FormContext);

  const {
    loaderState: [pageLoading, setPageLoading],
  } = useContext(ProductContext);

  const [order, setOrder] = useState(null);
  const [cart, setCart] = useState(
    localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') || '[]') : [],
  );

  const currentProductQty = (product) => {
    const foundProduct = cart.find((data) => data.id === product.id);
    return foundProduct ? foundProduct.qty : 0;
  };

  const calculateAmount = (cartProducts = cart) => {
    let amount = cartProducts.reduce((res, product) => {
      let price = product.product_price.replace(/^\D+/g, '');
      res += eval(`${product.qty.toString()}*${price}`);
      return res;
    }, 0);
    return parseFloat(amount);
  };

  const placeOrderAction = async (payloadObj) => {
    setFormError('');
    try {
      setSubmitLoader(true);
      const res = await placeOrder(payloadObj);
      if (!res.data) {
        setFormError(res.error);
      } else {
        localStorage.removeItem('cart');
        setCart([]);
      }
      setSubmitLoader(false);
      return res.success ? res.data : null;
    } catch (err) {
      setFormError(err.message);
    }
  };

  const getOrderByIdAction = async (orderId) => {
    try {
      setPageLoading(true);
      const res = await getOrderById(orderId);
      setOrder(res.data ? res.data : DEFAULT.NOT_FOUND);
      setPageLoading(false);
    } catch (err) {
      setFormError(err.message);
    }
  };
  return (
    <CheckoutContext.Provider
      value={{
        cartState: [cart, setCart],
        orderState: [order, setOrder],
        currentProductQty,
        calculateAmount,
        placeOrderAction,
        getOrderByIdAction,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
};

CheckoutProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line import/no-default-export
export default CheckoutProvider;
