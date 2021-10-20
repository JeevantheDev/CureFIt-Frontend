import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { DEFAULT } from '../../../app/entity/constant';
import { getProductById, getProducts } from '../../../app/api/product.api';

export const ProductContext = React.createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState();
  const [product, setProduct] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);
  const [filterQuery, setFilterQuery] = useState({ search: '', category: '' });
  const [limit, setLimit] = useState(DEFAULT.LIMIT);
  const [page, setPage] = useState(DEFAULT.PAGE);

  const fetchProducts = async () => {
    setPageLoading(true);
    const res = await getProducts(filterQuery, limit, page);
    setProducts(res.data ? res.data : []);
    setPageLoading(false);
  };

  const fetchProductById = async (productId) => {
    setPageLoading(true);
    const res = await getProductById(productId);
    setProduct(res.data ? res.data.product : DEFAULT.NOT_FOUND);
    setPageLoading(false);
  };

  return (
    <ProductContext.Provider
      value={{
        loaderState: [pageLoading, setPageLoading],
        productsState: [products],
        productState: [product],
        filterState: [filterQuery, setFilterQuery],
        limitState: [limit, setLimit],
        pageState: [page, setPage],
        fetchProducts,
        fetchProductById,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line import/no-default-export
export default ProductProvider;
