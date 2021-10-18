import PropTypes from 'prop-types';
import React, { useState } from 'react';

export const CheckoutContext = React.createContext();

const CheckoutProvider = ({ children }) => {
  const [cart, setCart] = useState(
    localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart') || '[]') : [],
  );

  const currentProductQty = (product) => {
    const foundProduct = cart.find((data) => data.id === product.id);
    return foundProduct ? foundProduct.qty : 0;
  };

  const calculateAmount = () => {
    let amount = cart.reduce((res, product) => {
      let price = product.product_price.replace(/^\D+/g, '');
      res += eval(`${product.qty.toString()}*${price}`);
      return res;
    }, 0);
    return parseFloat(amount);
  };

  return (
    <CheckoutContext.Provider
      value={{
        cartState: [cart, setCart],
        currentProductQty,
        calculateAmount,
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
