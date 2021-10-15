import axios from 'axios';
import { env_variables } from '../config';

const current_env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';
const BASE_API_URL = env_variables[current_env].api_endpoint;

export const getConfig = () => {
  const TOKEN = localStorage.getItem('sessionToken');

  return {
    headers: {
      Authorization: 'Bearer ' + TOKEN,
    },
  };
};

// ====================== GET Request and Post Request ========================

// Get Request

/**
 * @async
 * @param {string} url
 * @param {requestCallback} config
 * @returns {Promise<any>}
 */
export async function getRequest(url, config) {
  let responseBody = {};
  try {
    await axios
      .get(BASE_API_URL + url, config)
      .then((response) => {
        responseBody = response.data;
      })
      .catch((err) => {
        responseBody = err.response.data;
      });
  } catch (error) {
    responseBody = error;
  }
  return responseBody;
}

//Post Request

/**
 * @async
 * @param {string} url
 * @param {Object} param
 * @param {requestCallback} config
 * @returns {Promise<any>}
 */
export async function postRequest(url, param, config) {
  let responseBody = {};
  try {
    await axios
      .get(BASE_API_URL + url, param.params, config)
      .then((response) => {
        responseBody = response.data;
      })
      .catch((err) => {
        responseBody = err.response.data;
      });
  } catch (error) {
    responseBody = error;
  }
  return responseBody;
}
