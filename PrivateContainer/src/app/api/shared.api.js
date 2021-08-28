import { getConfig, putRequest } from './http.helper';
import { API_ROUTES } from './api.routes';

/**
 * @async
 * @param {obj} userObj
 * @returns {Promise<any>}
 */
export const updateUserDetails = async (userObj) => {
  return await putRequest(API_ROUTES.UPDATE_DETAILS, { params: { ...userObj } }, getConfig());
};
