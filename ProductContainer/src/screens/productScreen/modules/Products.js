import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../context/product.context';
import Product from 'curefit/Product/Product';
import { Grid, Typography } from '@material-ui/core';
import { ServiceTitle } from '../../../components/ServiceTitle/ServiceTitle';
import { useHistory } from 'react-router-dom';
import { PRODUCT_APPLICATION_URL } from '../../../app/router/ApplicationRoutes';
import { AddToCart } from '../../../components/AddToCart/AddToCart';
import { CheckoutContext } from '../../checkoutScreen/context/checkout.context';

const Products = () => {
  const history = useHistory();

  const {
    loaderState: [pageLoading],
    productsState: [products],
    fetchProducts,
  } = useContext(ProductContext);
  const {
    cartState: [cart, setCart],
    currentProductQty,
  } = useContext(CheckoutContext);

  useEffect(() => {
    fetchProducts();
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
      <ServiceTitle title="Browse medicines & health products" />
      {!pageLoading && products && products.length === 0 && <Typography>No Products Found...</Typography>}
      <Grid container spacing={3}>
        {(pageLoading || !products ? Array.from(new Array(5)) : products).map((product, idx) => (
          <Grid key={product ? product.id : idx} item xs={12} md={3}>
            <Product
              onClickCard={() =>
                product && history.push(PRODUCT_APPLICATION_URL.PRODUCT_LIST_SLUG.replace(':slug', product.id))
              }
              product={product}
            >
              {product && !pageLoading && (
                <AddToCart
                  onClick={(count, type) => {
                    addToCart(count, product, type);
                  }}
                  product={product}
                  quantity={currentProductQty(product)}
                />
              )}
            </Product>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default Products;
