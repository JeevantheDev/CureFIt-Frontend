import { getConfig, getRequest, postRequest, putRequest, deleteRequest } from './http.helper';
import { API_ROUTES } from './api.routes';

/**
 * @async
 * @param {string} profileId
 * @returns {Promise<any>}
 */
export const getProfileById = async (profileId) => {
  return await getRequest(API_ROUTES.PROFILE_BY_ID.replace('id', profileId));
};

/**
 * @async
 * @param {Object} profileObj
 * @returns {Promise<any>}
 */
export const createProfile = async (profileObj) => {
  return await postRequest(API_ROUTES.CREATE_PROFILE, { params: { ...profileObj } }, getConfig());
};

/**
 * @async
 * @param {Object} profileObj
 * @returns {Promise<any>}
 */
export const updateProfile = async (profileObj) => {
  return await putRequest(
    API_ROUTES.UPDATE_PROFILE.replace('id', profileObj.id),
    { params: { ...profileObj } },
    getConfig(),
  );
};

//  ======================== Clinic API Handlers ========================

/**
 * @async
 * @param {Object} clinicObj
 * @returns {Promise<any>}
 */
export const createClinic = async (clinicObj) => {
  return await postRequest(
    API_ROUTES.CREATE_CLINIC.replace('id', clinicObj.profileId),
    { params: { ...clinicObj } },
    getConfig(),
  );
};

/**
 * @async
 * @param {Object} clinicObj
 * @returns {Promise<any>}
 */
export const updateClinic = async (clinicObj) => {
  return await putRequest(
    API_ROUTES.UPDATE_CLINIC.replace('id', clinicObj.id),
    { params: { ...clinicObj } },
    getConfig(),
  );
};

/**
 * @async
 * @param {string} clinicId
 * @returns {Promise<any>}
 */
export const deleteClinic = async (clinicId) => {
  return await deleteRequest(API_ROUTES.UPDATE_CLINIC.replace('id', clinicId), getConfig());
};
