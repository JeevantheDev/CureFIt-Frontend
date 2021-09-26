import { getConfig, getRequest, postRequest, putRequest, deleteRequest } from './http.helper';
import { API_ROUTES } from './api.routes';

/**
 * @async
 * @param {Object} obj
 * @returns {Promise<any>}
 */
export const getAppontments = async (obj, limit, page) => {
  /* prettier-ignore */
  const BY_DATE = obj.date ? `&appointment_date=${obj.date}` : '';
  /* prettier-ignore */
  const BY_DOCTOR = obj.by_doctor ? `&doc_user_id=${obj.by_doctor}` : '';
  /* prettier-ignore */
  const BY_USER = obj.by_user ? `&user_id=${obj.by_user}` : '';
  /* prettier-ignore */
  const BY_PATIENT_NAME = obj.patient_name ? `&patient_name=${obj.patient_name}` : '';
  /* prettier-ignore */
  const PAGINATION = `?limit=${limit || 6}&page=${page || 1}`;
  /* prettier-ignore */
  const API_PATH =
    API_ROUTES.GET_APPOINTMENTS + PAGINATION + BY_DATE + BY_DOCTOR + BY_USER + BY_PATIENT_NAME;
  return await getRequest(API_PATH, getConfig());
};

/**
 * @async
 * @param {Object} obj
 * @returns {Promise<any>}
 */
export const createAppointment = async (obj) => {
  return await postRequest(
    API_ROUTES.CREATE_APPOINTMENT.replace('id', obj.profile_id),
    { params: { ...obj } },
    getConfig(),
  );
};

/**
 * @async
 * @param {Object} obj
 * @returns {Promise<any>}
 */
export const updateAppointment = async (obj) => {
  return await putRequest(
    API_ROUTES.UPDATE_DELETE_APPOINTMENT.replace('id', obj.appointment_id),
    { params: { ...obj } },
    getConfig(),
  );
};

/**
 * @async
 * @param {string} appointment_id
 * @returns {Promise<any>}
 */

export const deleteAppointment = async (appointment_id) => {
  return await deleteRequest(API_ROUTES.UPDATE_DELETE_APPOINTMENT.replace('id', appointment_id), getConfig());
};
