import { getConfig, getRequest, postRequest, putRequest, deleteRequest } from './http.helper';
import { API_ROUTES } from './api.routes';

/**
 * @async
 * @param {Object} obj
 * @returns {Promise<any>}
 */
export const getProductBySeller = async (obj, limit, page) => {
  /* prettier-ignore */
  const BY_SELLER = obj.user_id ? `&user_id=${obj.user_id}` : '';
  /* prettier-ignore */
  const BY_PRODUCT_NAME = obj.product_title ? `&slug=${obj.product_title}` : '';
  /* prettier-ignore */
  const PAGINATION = `?limit=${limit || 6}&page=${page || 1}`;
  /* prettier-ignore */
  const API_PATH =
    API_ROUTES.GET_PRODUCTS_BY_SELLER + PAGINATION + BY_SELLER + BY_PRODUCT_NAME;
  return await getRequest(API_PATH, getConfig());
};

/**
 * @async
 * @param {Object} obj
 * @returns {Promise<any>}
 */
export const createProduct = async (obj) => {
  return await postRequest(API_ROUTES.ADD_PRODUCT, { params: { ...obj } }, getConfig());
};

/**
 * @async
 * @param {Object} obj
 * @returns {Promise<any>}
 */
export const updateProduct = async (obj) => {
  return await putRequest(API_ROUTES.UPDATE_DELETE_PRODUCT.replace('id', obj.id), { params: { ...obj } }, getConfig());
};

/**
 * @async
 * @param {string} product_id
 * @returns {Promise<any>}
 */

export const deleteProduct = async (product_id) => {
  return await deleteRequest(API_ROUTES.UPDATE_DELETE_PRODUCT.replace('id', product_id), getConfig());
};
