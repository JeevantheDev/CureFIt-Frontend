import { Box, Chip, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import StarIcon from '@material-ui/icons/Star';
import Skeleton from '@material-ui/lab/Skeleton';
import React, { useContext } from 'react';

import { FormContext } from '../../../app/context/form.context';
import { ProfileContext } from '../../../screens/profileScreen/context/profile.context';
import { SellerContext } from '../../../screens/sellerScreen/context/seller.context';
import { ProductForm } from '../../ProductForm/ProductForm';
import ModalLayout from '../../shared/ModalLayout/ModalLayout';
import { CustomTableCell } from '../CustomTableCell';
import { CustomTableRow } from '../CustomTableRow';

const useStyles = makeStyles((theme) => ({
  greenBackground: {
    backgroundColor: '#0EAC27',
    color: '#fff',
    width: '4rem',
    height: '2rem',
  },
}));

// import PatientInfo from '../../PatientInfo/PatientInfo';
export const ProductsList = () => {
  const classes = useStyles();
  const {
    loaderState: [pageLoading],
  } = useContext(ProfileContext);
  const {
    productsState: [products],
    createUpdateProductAction,
    deleteProductAction,
  } = useContext(SellerContext);
  const {
    productState: [selectedProduct, setSelectedProduct],
    formState: [formError, setFormError],
    editState: [isEditFlag, setIsEditFlag],
  } = useContext(FormContext);

  const handleSubmitAction = (formObj) => {
    setFormError('');
    if (formObj) {
      const payloadObj = {
        ...formObj,
        isEditFlag: formObj.isEditFlag,
      };
      createUpdateProductAction(payloadObj);
    } else {
      setFormError('FILL ALL THE FIELDS');
    }
  };

  const handleDeleteProduct = (productId) => {
    confirm('Are you sure ?') && deleteProductAction(productId);
  };

  const handleCloseModal = () => {
    setIsEditFlag(false);
    setSelectedProduct(null);
  };

  return (
    <>
      {!pageLoading && products && products.length === 0 && <p>No Products Found...</p>}
      {(pageLoading || !products ? Array.from(new Array(10)) : products).map((product, idx) => (
        <CustomTableRow key={product ? product.id : idx}>
          <CustomTableCell>
            {product ? product.product_title : <Skeleton variant="text" width={80} height={20} />}
          </CustomTableCell>
          <CustomTableCell>
            {product ? product.product_category : <Skeleton variant="text" width={80} height={20} />}
          </CustomTableCell>
          <CustomTableCell>
            {product ? product.product_price : <Skeleton variant="text" width={80} height={20} />}
          </CustomTableCell>
          <CustomTableCell>
            {product ? product.stocks : <Skeleton variant="text" width={80} height={20} />}
          </CustomTableCell>
          <CustomTableCell>
            {product ? (
              <Box display="flex" mb={2} alignItems="center">
                <Chip
                  className={classes.greenBackground}
                  label={product.average_rating || 0.0}
                  icon={<StarIcon style={{ color: '#fff' }} />}
                />
              </Box>
            ) : (
              <Skeleton variant="text" width={80} height={20} />
            )}
          </CustomTableCell>
          <CustomTableCell>
            {product ? (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditFlag(true);
                  setSelectedProduct(product);
                }}
                color="Primary"
                variant="text"
              >
                <EditIcon />
              </IconButton>
            ) : (
              <Skeleton variant="text" width={100} height={20} />
            )}
          </CustomTableCell>
          <CustomTableCell>
            {product ? (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteProduct(product._id);
                }}
                color="secondary"
                variant="text"
              >
                <DeleteIcon />
              </IconButton>
            ) : (
              <Skeleton variant="text" width={100} height={20} />
            )}
          </CustomTableCell>
        </CustomTableRow>
      ))}
      {selectedProduct && (
        <ModalLayout title="Product Details" open={true} handleClose={handleCloseModal}>
          <ProductForm onSubmit={handleSubmitAction} />
        </ModalLayout>
      )}
    </>
  );
};
