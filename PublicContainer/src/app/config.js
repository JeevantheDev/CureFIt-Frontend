export const env_variables = {
  dev: {
    env_name: 'development',
    api_endpoint: 'http://localhost:5000/.netlify/functions/server/dev/api/v1',
  },
  prod: {
    env_name: 'production',
    api_endpoint: 'https://curefit-api.netlify.app/.netlify/functions/server/prod/api/v1',
  },
};
