import { Box, Button, Divider, Typography } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { AddToCart } from '../../../components/AddToCart/AddToCart';
import { CartItem } from '../../../components/CartItem/CartItem';
import { CheckoutContext } from '../context/checkout.context';
import { AppContext } from '../../../app/context/app.context';
import { PRODUCT_APPLICATION_URL } from '../../../app/router/ApplicationRoutes';

const Cart = () => {
  const history = useHistory();

  const {
    tokenState: [currentToken],
    setReturnUrl,
  } = useContext(AppContext);
  const {
    cartState: [cart, setCart],
    currentProductQty,
    calculateAmount,
  } = useContext(CheckoutContext);

  useEffect(() => {
    const cartData = cart.filter((data) => data.qty > 0);
    localStorage.setItem('cart', JSON.stringify(cartData));
  }, [cart]);

  const addToCart = (count, product, type = 'inc') => {
    const index = cart.findIndex((data) => data.id === product.id);
    if (index !== -1) {
      const prevCarts = [...cart];
      prevCarts[index].qty = type === 'inc' ? count + 1 : count - 1;
      const cartData = prevCarts.filter((data) => data.qty > 0);
      setCart(cartData);
    } else {
      setCart((prevCart) => [...prevCart, { ...product, qty: count + 1 }]);
    }
  };

  const onNavigate = (e) => {
    e.stopPropagation();
    if (currentToken) {
      history.push(PRODUCT_APPLICATION_URL.PRODUCT_CHECKOUT_ALL);
    } else {
      setReturnUrl(history.location.pathname);
      history.push(PRODUCT_APPLICATION_URL.AUTH_SIGNIN_CONTAINER);
    }
  };

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="stretch" mt={3}>
        <Box>
          <Typography
            align="center"
            variant="h5"
            style={{ color: '#333', letterSpacing: '0.02em', fontWeight: 600 }}
            gutterBottom
          >
            My Cart: {cart.length || 0} item
          </Typography>
        </Box>
        <Divider />
        <Box>
          {cart.map((product) => (
            <CartItem product={product} key={product.id}>
              <AddToCart
                width={'100%'}
                onClick={(count, type) => {
                  addToCart(count, product, type);
                }}
                product={product}
                quantity={currentProductQty(product)}
              />
            </CartItem>
          ))}
        </Box>
        <Divider />
        {cart.length > 0 && (
          <Box my={2}>
            <Typography variant="h5" style={{ color: '#333', letterSpacing: '0.02em', fontWeight: 600 }} gutterBottom>
              Payable Amount: ₹{calculateAmount()}
            </Typography>
            <Button onClick={onNavigate} fullWidth size="large" variant="contained" color="primary">
              Checkout
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default Cart;
