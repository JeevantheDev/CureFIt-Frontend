import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../context/product.context';
import Product from 'curefit/Product/Product';
import { Grid, Button } from '@material-ui/core';
import { ServiceTitle } from '../../../components/ServiceTitle/ServiceTitle';

const Products = () => {
  const {
    loaderState: [pageLoading],
    productState: [products],
    fetchProducts,
  } = useContext(ProductContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <ServiceTitle title="Browse medicines & health products" />
      <Grid container spacing={3}>
        {(pageLoading || !products ? Array.from(new Array(5)) : products).map((product, idx) => (
          <Grid key={product ? product.id : idx} item xs={12} md={3}>
            <Product onClickCard={() => {}} product={product}>
              <Button style={{ marginTop: '1rem' }} fullWidth color="secondary" variant="contained" size="medium">
                Add
              </Button>
            </Product>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default Products;
