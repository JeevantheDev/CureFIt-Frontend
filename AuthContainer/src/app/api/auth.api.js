import { postRequest, putRequest } from './http.helper';
import { API_ROUTES } from './api.routes';

/**
 * @async
 * @param {Object} obj
 * @returns {Promise<any>}
 */
export const userLogin = async (obj) => {
  return await postRequest(API_ROUTES.AUTH_LOGIN, { params: { ...obj } });
};

/**
 * @async
 * @param {Object} obj
 * @returns {Promise<any>}
 */
export const userSignup = async (obj) => {
  return await postRequest(API_ROUTES.AUTH_SIGNUP, { params: { ...obj } });
};

/**
 * @async
 * @param {Object} obj
 * @returns {Promise<any>}
 */
export const forgetPassword = async (obj) => {
  return await postRequest(API_ROUTES.AUTH_FORGET_PASSWORD, { params: { ...obj } });
};

/**
 * @async
 * @param {Object} obj
 * @returns {Promise<any>}
 */
export const resetPassword = async (obj) => {
  return await putRequest(API_ROUTES.AUTH_RESET_PASSWORD.replace('token', obj.token), { params: { ...obj } });
};
