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

  return (
    <CheckoutContext.Provider
      value={{
        cartState: [cart, setCart],
        currentProductQty,
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
