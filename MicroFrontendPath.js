exports.MICRO_FRONTEND_PATH = {
  MAIN_CONTAINER: {
    NAME: 'mainContainer',
    PORT: 8080,
    PATH: `http://localhost:8080/`,
    TEMPLATE: './public/index.html',
    REMOTES: {
      publicContainer: `publicContainer@${
        process.env.PUBLIC_CONTAINER_DOMAIN || `http://localhost:8081`
      }/remoteEntry.js`,
      authContainer: `authContainer@${
        process.env.AUTH_CONTAINER_DOMAIN || `http://localhost:8082`
      }/remoteEntry.js`,
      privateContainer: `privateContainer@${
        process.env.PRIVATE_CONTAINER_DOMAIN || `http://localhost:8083`
      }/remoteEntry.js`,
    },
  },
  PUBLIC_CONTAINER: {
    NAME: 'publicContainer',
    FILE_NAME: 'remoteEntry.js',
    PORT: 8081,
    PATH: `http://localhost:8081/`,
    TEMPLATE: './public/index.html',
    EXPOSES: {
      './PublicContainerApp': './src/bootstrap',
    },
    WORKING_DOMAIN: `publicContainer@${
      process.env.PUBLIC_CONTAINER_DOMAIN || `http://localhost:8081`
    }/remoteEntry.js`,
    REMOTES: {
      privateContainer: `privateContainer@${
        process.env.PRIVATE_CONTAINER_DOMAIN || `http://localhost:8083`
      }/remoteEntry.js`,
    },
  },
  AUTH_CONTAINER: {
    NAME: 'authContainer',
    FILE_NAME: 'remoteEntry.js',
    PORT: 8082,
    PATH: `http://localhost:8082/`,
    TEMPLATE: './public/index.html',
    EXPOSES: {
      './AuthContainerApp': './src/bootstrap',
    },
    WORKING_DOMAIN: `authContainer@${
      process.env.AUTH_CONTAINER_DOMAIN || `http://localhost:8082`
    }/remoteEntry.js`,
  },
  PRIVATE_CONTAINER: {
    NAME: 'privateContainer',
    FILE_NAME: 'remoteEntry.js',
    PORT: 8083,
    PATH: `http://localhost:8083/`,
    TEMPLATE: './public/index.html',
    EXPOSES: {
      './PrivateContainerApp': './src/bootstrap',
    },
    WORKING_DOMAIN: `privateContainer@${
      process.env.PRIVATE_CONTAINER_DOMAIN || `http://localhost:8083`
    }/remoteEntry.js`,
  },
};
