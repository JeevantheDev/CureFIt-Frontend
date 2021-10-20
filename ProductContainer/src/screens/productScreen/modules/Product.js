import { Box, Grid, Typography } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { AddToCart } from '../../../components/AddToCart/AddToCart';

import { ProductDetails } from '../../../components/ProductDetails/ProductDetails';
import { ProductImage } from '../../../components/ProductImage/ProductImage';
import { Reviews } from '../../../components/Reviews/Reviews';
import { ProductContext } from '../context/product.context';
import { CheckoutContext } from '../../checkoutScreen/context/checkout.context';
import { DEFAULT } from '../../../app/entity/constant';

const Product = (props) => {
  const { slug: productId } = props.match.params;

  const {
    loaderState: [pageLoading],
    productState: [product],
    fetchProductById,
  } = useContext(ProductContext);

  const {
    cartState: [cart, setCart],
    currentProductQty,
  } = useContext(CheckoutContext);

  useEffect(() => {
    fetchProductById(productId);
  }, []);

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

  return (
    <>
      {!pageLoading && product === DEFAULT.NOT_FOUND && (
        <Box p={2}>
          <Typography variant="body1" color="textSecondary" style={{ letterSpacing: '0.02em' }} gutterBottom>
            Product {DEFAULT.NOT_FOUND}
          </Typography>
        </Box>
      )}
      <Grid style={{ margin: '2rem 0' }} container spacing={3}>
        <Grid item xs={12} md={5}>
          {product !== DEFAULT.NOT_FOUND && (
            <ProductImage productImages={product ? product.product_image : null} loading={pageLoading} />
          )}
        </Grid>
        <Grid item xs={12} md={7}>
          {product !== DEFAULT.NOT_FOUND && (
            <ProductDetails productDetails={product} loading={pageLoading}>
              {product && !pageLoading && (
                <AddToCart
                  onClick={(count, type) => {
                    addToCart(count, product, type);
                  }}
                  width={'50%'}
                  product={product}
                  quantity={currentProductQty(product)}
                />
              )}
            </ProductDetails>
          )}
        </Grid>
        <Grid item xs={12} md={12}>
          {product !== DEFAULT.NOT_FOUND && <Reviews product={product || null} loading={pageLoading} />}
        </Grid>
      </Grid>
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default Product;
