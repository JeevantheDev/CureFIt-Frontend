import React, { useContext, useEffect } from 'react';
import { ProductContext } from '../context/product.context';
import Product from 'curefit/Product/Product';
import { Grid, Button, Typography } from '@material-ui/core';
import { ServiceTitle } from '../../../components/ServiceTitle/ServiceTitle';
import { useHistory } from 'react-router-dom';
import { PRODUCT_APPLICATION_URL } from '../../../app/router/ApplicationRoutes';

const Products = () => {
  const history = useHistory();
  const {
    loaderState: [pageLoading],
    productsState: [products],
    fetchProducts,
  } = useContext(ProductContext);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <ServiceTitle title="Browse medicines & health products" />
      <Grid container spacing={3}>
        {!pageLoading && products && products.length === 0 && <Typography>No Products Found...</Typography>}
        {(pageLoading || !products ? Array.from(new Array(5)) : products).map((product, idx) => (
          <Grid key={product ? product.id : idx} item xs={12} md={3}>
            <Product
              onClickCard={() =>
                product && history.push(PRODUCT_APPLICATION_URL.PRODUCT_CONTAINER_SLUG.replace(':slug', product.id))
              }
              product={product}
            >
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
