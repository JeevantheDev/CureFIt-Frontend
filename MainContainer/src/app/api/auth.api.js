import { getRequest, getConfig } from './http.helper';
import { API_ROUTES } from './api.routes';

/**
 * @async
 * @returns {Promise<any>}
 */
export const userRedirect = async () => {
  return await getRequest(API_ROUTES.AUTH_REDIRECT, getConfig());
};
