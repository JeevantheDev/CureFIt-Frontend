import { getRequest } from './http.helper';
import { API_ROUTES } from './api.routes';
import { DEFAULT } from '../entity/constant';

/**
 * @async
 * @param {Object} obj
 * @param {string} limit
 * @param {string} page
 * @returns {Promise<any>}
 */
export const getDoctorProfiles = async (obj, limit, page) => {
  /* prettier-ignore */
  const BY_NAME = obj.search ? `&slug=${obj.search}` : '';
  /* prettier-ignore */
  const BY_LOCATION = obj.location ? `&overall_city[in]=${obj.location}` : '';
  /* prettier-ignore */
  const BY_EXPERIENCE = 
    obj.experience && obj.experience !== DEFAULT.EXPERIENCE ? `&total_experience[lte]=${obj.experience}` : '';
  /* prettier-ignore */
  const BY_SPECALISTS = 
    obj.specalists && obj.specalists !== DEFAULT.SPECALISTS ? `&specializations[in]=${obj.specalists}`: '';
  /* prettier-ignore */
  const PAGINATION = `?limit=${limit}&page=${page}`;

  /* prettier-ignore */
  const API_PATH =
    API_ROUTES.PROFILES + PAGINATION + BY_NAME + BY_LOCATION + BY_EXPERIENCE + BY_SPECALISTS;

  return await getRequest(API_PATH);
};
