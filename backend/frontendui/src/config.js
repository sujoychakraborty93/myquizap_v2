// require('dotenv').config();

const config = {
    apiUrlDev: process.env.REACT_APP_API_URL_DEV,
    apiUrlProd: process.env.REACT_APP_API_URL_PROD,
    node_env: process.env.REACT_APP_NODE_ENV
  };
  
export default config;