import { Grid } from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { ProductDetails } from '../../../components/ProductDetails/ProductDetails';

import { ProductImage } from '../../../components/ProductImage/ProductImage';
import { ProductContext } from '../context/product.context';

const Product = (props) => {
  const { slug: productId } = props.match.params;

  const {
    loaderState: [pageLoading],
    productState: [product],
    fetchProductById,
  } = useContext(ProductContext);

  useEffect(() => {
    fetchProductById(productId);
  }, []);

  return (
    <Grid style={{ margin: '2rem 0' }} container spacing={4}>
      <Grid item xs={12} md={5}>
        <ProductImage productImages={product ? product.product_image : null} loading={pageLoading} />
        {/* <Reviews /> */}
      </Grid>
      <Grid item xs={12} md={7}>
        <ProductDetails productDetails={product || null} loading={pageLoading} />
      </Grid>
    </Grid>
  );
};

// eslint-disable-next-line import/no-default-export
export default Product;
