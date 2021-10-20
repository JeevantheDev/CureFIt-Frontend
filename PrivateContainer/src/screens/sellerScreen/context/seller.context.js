import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';

import {
  createProduct,
  deleteProduct,
  getProductBySeller,
  updateProduct,
  getUserBillsBySeller,
} from '../../../app/api/product.api';
import { FormContext } from '../../../app/context/form.context';
import { ProfileContext } from '../../profileScreen/context/profile.context';

export const SellerContext = React.createContext();

const SellerProvider = ({ children }) => {
  const {
    editState: [isEditFlag, setIsEditFlag],
    loaderState: [submitLoader, setSubmitLoader],
    formState: [formError, setFormError],
    productState: [selectedProduct, setSelectedProduct],
  } = useContext(FormContext);
  const {
    loaderState: [pageLoading, setPageLoading],
  } = useContext(ProfileContext);

  const [products, setProducts] = useState([]);
  const [sellerOrders, setSellerOrders] = useState([]);

  const calculateAmount = (products) => {
    let amount = products.reduce((res, product) => {
      let price = product.product_price.replace(/^\D+/g, '');
      res += eval(`${product.qty.toString()}*${price}`);
      return res;
    }, 0);
    return parseFloat(amount);
  };

  // Products CRUD Actions
  const getProductsAction = async (queryObj) => {
    setPageLoading(true);
    const res = await getProductBySeller(queryObj);
    setProducts(res.data ? res.data : []);
    setPageLoading(false);
  };

  const createUpdateProductAction = async (productObj) => {
    setFormError('');
    setSubmitLoader(true);
    try {
      const res = productObj.isEditFlag ? await updateProduct(productObj) : await createProduct(productObj);
      if (res.data) {
        const index = products.findIndex((x) => x._id === res.data._id);
        if (index !== -1) {
          const productList = products;
          productList[index] = res.data;
          setProducts(productList);
          setIsEditFlag(false);
        } else {
          setProducts((prevList) => [...prevList, res.data]);
        }
        setSelectedProduct(null);
      } else {
        setFormError(res.error);
      }
      setSubmitLoader(false);
      return res.success || false;
    } catch (error) {
      setFormError(error.message || 'SOMETHING WENT WRONG');
    }
  };

  const deleteProductAction = async (productId) => {
    setFormError('');
    setSubmitLoader(true);
    const res = await deleteProduct(productId);
    if (res.data) {
      const index = products.findIndex((x) => x._id === res.data.id);
      if (index !== -1) {
        const productList = products;
        productList.splice(index, 1);
        setProducts(productList);
      }
    } else {
      setFormError(res.error || 'NETWORK ERROR');
    }
    setSubmitLoader(false);
  };

  // Orders CRUD Actions
  const getOrdersAction = async (queryObj) => {
    setPageLoading(true);
    const res = await getUserBillsBySeller(queryObj);
    if (res.data) {
      const filteredData = res.data.map((obj) => {
        obj.product_info = obj.product_info.filter((product) => product.user_id === queryObj.by_seller);
        obj.total_qty = obj.product_info.length;
        obj.payment.total_price = calculateAmount(obj.product_info);
        return obj;
      });
      setSellerOrders(filteredData);
    } else {
      setSellerOrders([]);
    }
    setPageLoading(false);
  };

  return (
    <SellerContext.Provider
      value={{
        productsState: [products, setProducts],
        sellerOrderState: [sellerOrders, setSellerOrders],
        getProductsAction,
        createUpdateProductAction,
        deleteProductAction,
        getOrdersAction,
      }}
    >
      {children}
    </SellerContext.Provider>
  );
};

SellerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line import/no-default-export
export default SellerProvider;
