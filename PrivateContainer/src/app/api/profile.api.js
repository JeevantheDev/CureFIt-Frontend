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
 * @param {Object} filterObj
 * @returns {Promise<any>}
 */
export const getClinicsByDoctor = async (filterObj, limit, page) => {
  /* prettier-ignore */
  const PAGINATION = `?limit=${limit || 6}&page=${page || 1}`;
  /* prettier-ignore */
  const BY_DOCTOR = filterObj.user_id ? `&user_id=${filterObj.user_id}` : '';
  /* prettier-ignore */
  const BY_NAME = filterObj.clinic_name ? `&clinic_name=${filterObj.clinic_name}` : '';

  const API_PATH = API_ROUTES.GET_CLINICS_BY_DOCTOR + PAGINATION + BY_DOCTOR + BY_NAME;

  return await getRequest(API_PATH, getConfig());
};

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
