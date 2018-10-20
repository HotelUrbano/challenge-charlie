const {
  NODE_ENV = 'development',
  REACT_APP_CHALLANGE_BRAVO_API_BING_TIMEOUT = 1000,
  REACT_APP_YAHOO_API_LOCATION_NAME_TIMEOUT = 1000,
  REACT_APP_YAHOO_API_COORDINATES_TIMEOUT = 1000,
} = process.env;


export default {
  ...process.env,
  NODE_ENV,
  REACT_APP_CHALLANGE_BRAVO_API_BING_TIMEOUT,
  REACT_APP_YAHOO_API_LOCATION_NAME_TIMEOUT,
  REACT_APP_YAHOO_API_COORDINATES_TIMEOUT,
};
