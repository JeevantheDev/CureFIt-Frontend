import { postRequest } from './http.helper';
import { API_ROUTES } from './api.routes';

/**
 * @async
 * @param {Object} obj
 * @returns {Promise<any>}
 */
export const userLogin = async (obj) => {
  return await postRequest(API_ROUTES.AUTH_LOGIN, {
    params: {
      ...obj,
    },
  });
};

/**
 * @async
 * @param {Object} obj
 * @returns {Promise<any>}
 */
export const userSignup = async (obj) => {
  return await postRequest(API_ROUTES.AUTH_SIGNUP, {
    params: {
      ...obj,
    },
  });
};
