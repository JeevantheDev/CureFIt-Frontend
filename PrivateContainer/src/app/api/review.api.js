import { getConfig, getRequest, postRequest, putRequest, deleteRequest } from './http.helper';
import { API_ROUTES } from './api.routes';

//  ======================== Review API Handlers ========================

/**
 * @async
 * @param {Object} reviewObj
 * @returns {Promise<any>}
 */
export const createReview = async (reviewObj) => {
  return await postRequest(
    API_ROUTES.CREATE_REVIEW.replace('reviewFor', reviewObj.review_for).replace('id', reviewObj.review_of),
    { params: { ...reviewObj } },
    getConfig(),
  );
};

/**
 * @async
 * @param {Object} reviewObj
 * @returns {Promise<any>}
 */
export const updateReview = async (reviewObj) => {
  return await putRequest(
    API_ROUTES.UPDATE_DELETE_REVIEW.replace('id', reviewObj.id),
    { params: { ...reviewObj } },
    getConfig(),
  );
};

/**
 * @async
 * @param {string} reviewId
 * @returns {Promise<any>}
 */
export const deleteReview = async (reviewId) => {
  return await deleteRequest(API_ROUTES.UPDATE_DELETE_REVIEW.replace('id', reviewId), getConfig());
};
