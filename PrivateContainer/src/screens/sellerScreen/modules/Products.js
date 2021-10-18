import { Box, Button, Typography } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Search from '@material-ui/icons/Search';
import React, { useContext, useEffect, useState } from 'react';

import { AppContext } from '../../../app/context/app.context';
import { FormContext } from '../../../app/context/form.context';
import { TABLE_ROWS } from '../../../app/entity/constant';
import { CustomTableLists } from '../../../components/CustomTableLists/CustomTableLists';
import { ProductsList } from '../../../components/CustomTableLists/ProductsList/ProductsList';
import { ServiceHeader } from '../../../components/shared/ServiceHeader/ServiceHeader';
import { SellerContext } from '../context/seller.context';

const Products = () => {
  const {
    userState: [currentAuthUser],
  } = useContext(AppContext);
  const { getProductsAction } = useContext(SellerContext);

  const {
    editState: [isEditFlag, setIsEditFlag],
    formState: [formError, setFormError],
    productState: [selectedProduct, setSelectedProduct],
  } = useContext(FormContext);

  const [product_title, setProductTitle] = useState('');

  useEffect(() => {
    getProductsAction({ user_id: currentAuthUser._id, product_title });
  }, [product_title]);

  const addProduct = (e) => {
    e.stopPropagation();
    setFormError('');
    setSelectedProduct({
      product_title: '',
      product_category: 'none',
      product_desc: '',
      product_price: '',
      product_image: '',
      stocks: 0,
    });
    setIsEditFlag(false);
  };

  const handleKeyEnter = (event) => {
    event.preventDefault();
    if (event.key !== 'Enter') return;
    setProductTitle(event.target.value);
  };

  return (
    <div>
      <ServiceHeader title="Your Products">
        <TextField
          name="product_title"
          size="small"
          variant="outlined"
          color="secondary"
          placeholder="search name"
          onKeyUp={handleKeyEnter}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search color="secondary" />
              </InputAdornment>
            ),
          }}
        />
      </ServiceHeader>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button color="secondary" onClick={addProduct} startIcon={<AddIcon />} variant="outlined">
          <Typography variant="caption" color="primary">
            Add Product
          </Typography>
        </Button>
      </Box>
      <CustomTableLists tableRows={TABLE_ROWS.PRODUCT_LIST}>
        <ProductsList />
      </CustomTableLists>
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default Products;
