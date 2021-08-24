import { getRequest } from './http.helper';
import { API_ROUTES } from './api.routes';

/**
 * @async
 * @param {string} profileId
 * @returns {Promise<any>}
 */
export const getProfileById = async (profileId) => {
  return await getRequest(API_ROUTES.PROFILE_BY_ID.replace('id', profileId));
};
