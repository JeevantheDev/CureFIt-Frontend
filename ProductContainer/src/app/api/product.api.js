import { getConfig, getRequest, postRequest } from './http.helper';
import { API_ROUTES } from './api.routes';

/**
 * @async
 * @param {Object} obj
 * @param {string} limit
 * @param {string} page
 * @returns {Promise<any>}
 */
export const getProducts = async (obj, limit, page) => {
  /* prettier-ignore */
  const BY_NAME = obj.search ? `&slug=${obj.search}` : '';
  /* prettier-ignore */
  const BY_CATEGORY = 
    obj.category ? `&product_category=${obj.category}`: '';
  /* prettier-ignore */
  const PAGINATION = `?limit=${limit}&page=${page}`;

  /* prettier-ignore */
  const API_PATH =
    API_ROUTES.PRODUCTS + PAGINATION + BY_NAME +  BY_CATEGORY;

  return await getRequest(API_PATH);
};

/**
 * @async
 * @param {string} productId
 * @returns {Promise<any>}
 */
export const getProductById = async (productId) => {
  return await getRequest(API_ROUTES.PRODUCT_ID.replace('id', productId));
};

/**
 * @async
 * @param {Object} productObj
 * @returns {Promise<any>}
 */
export const placeOrder = async (productObj) => {
  return await postRequest(API_ROUTES.USERBILL, { params: productObj }, getConfig());
};

/**
 * @async
 * @param {string} orderId
 * @returns {Promise<any>}
 */
export const getOrderById = async (orderId) => {
  return await getRequest(API_ROUTES.USERBILL_ID.replace('id', orderId), getConfig());
};
