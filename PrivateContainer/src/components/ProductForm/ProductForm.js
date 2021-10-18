import { Button, Grid, TextField, MenuItem } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';

import { FormContext } from '../../app/context/form.context';
import { PRODUCT_CATEGORIES } from '../../app/entity/constant';

export const ProductForm = ({ onSubmit }) => {
  const {
    loaderState: [submitLoader],
    formState: [formError],
    editState: [isEditFlag],
    productState: [selectedProduct],
  } = useContext(FormContext);

  const [product_image, setProductImage] = useState([]);
  const [product_title, setProductTitle] = useState('');
  const [product_category, setProductCategory] = useState('');
  const [product_desc, setProductDesc] = useState('');
  const [product_price, setProductPrice] = useState('');
  const [stocks, setStocks] = useState(0);

  useEffect(() => {
    setProductTitle(selectedProduct.product_title);
    setProductCategory(selectedProduct.product_category);
    setProductDesc(selectedProduct.product_desc);
    setProductPrice(selectedProduct.product_price);
    setProductImage(selectedProduct.product_image ? selectedProduct.product_image.join(',') : '');
    setStocks(selectedProduct.stocks ? selectedProduct.stocks : 0);
  }, [selectedProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: selectedProduct.id ? selectedProduct.id : '',
      product_title,
      product_category,
      product_desc,
      product_price,
      product_image: product_image.split(','),
      stocks: parseInt(stocks),
      isEditFlag,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {formError && (
        <Alert style={{ marginBottom: '1rem' }} severity="error">
          {formError}
        </Alert>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            size="small"
            fullWidth
            name="product_title"
            label="Add your product title"
            placeholder="enter your product title"
            variant="outlined"
            value={product_title}
            onChange={(e) => setProductTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            size="small"
            fullWidth
            name="product_category"
            variant="outlined"
            select
            color="secondary"
            value={product_category}
            onChange={(e) => setProductCategory(e.target.value)}
          >
            <MenuItem style={{ backgroundColor: '#fff' }} value={'none'}>
              Choose your category
            </MenuItem>
            {PRODUCT_CATEGORIES.map((category) => (
              <MenuItem style={{ backgroundColor: '#fff' }} key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            size="small"
            fullWidth
            name="product_price"
            label="Add your product price"
            placeholder="enter your product price e.g: ₹450"
            variant="outlined"
            value={product_price}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            size="small"
            fullWidth
            type="number"
            name="stocks"
            label="Add your stocks"
            placeholder="enter your stocks"
            variant="outlined"
            value={stocks}
            onChange={(e) => setStocks(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            size="small"
            fullWidth
            name="product_image"
            label="Add your product image(urls)"
            placeholder="enter your product image (comma separted urls)"
            variant="outlined"
            multiline
            minRows="5"
            value={product_image}
            onChange={(e) => setProductImage(e.target.value.trim())}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            size="small"
            type="text"
            fullWidth
            name="product_desc"
            label="Add your product description"
            placeholder="enter your product description"
            variant="outlined"
            multiline
            minRows="5"
            value={product_desc}
            onChange={(e) => setProductDesc(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button fullWidth variant="contained" color="secondary" type="submit">
            {isEditFlag ? (submitLoader ? 'Updating...' : 'Update') : submitLoader ? 'Adding...' : 'Add'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

ProductForm.proptypes = {
  onSubmit: PropTypes.func.isRequired,
};
