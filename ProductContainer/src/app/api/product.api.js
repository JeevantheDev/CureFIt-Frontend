import { getRequest } from './http.helper';
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
