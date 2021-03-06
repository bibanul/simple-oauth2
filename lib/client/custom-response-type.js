/**
 * https://tools.ietf.org/html/rfc6749#section-8.4
 * Custom response-type support
 */
module.exports = function (config) {
  var core = require('./../core')(config);
  var qs = require('querystring');

  /**
   * Redirect the user to the autorization page
   * @param  {Object} params
   *         params.redirectURI - A string that represents the registered application URI
   *         											where the user is redirected after authentication
   *         params.scope - A String that represents the application privileges
   *         params.state - A String that represents an option opaque value used by the client
   *         								to main the state between the request and the callback
   *         params.response_type - A custom defined response type as per https://tools.ietf.org/html/rfc6749#section-8.4
   */
  function authorizeURL(params) {
    params.client_id = config.clientID;

    return config.site + config.authorizationPath + '?' + qs.stringify(params);
  }

  /**
   * Returns the Access Token Object
   * @param  {Object}   params
   *         params[response_type] - Authorization code/key (from previous step)
   *         params.redirecURI - A string that represents the callback uri
   *         params.grant_type - Generally in the format 'authorization_' + params.response_type as perhttps://tools.ietf.org/html/rfc6749#section-8.4
   * @param  {Function} callback the callback function returning the results
   *                             An error object is passed as first argument and the result as last.
   */
  function getToken(params, callback) {
    return core.api('POST', config.tokenPath, params).nodeify(callback);
  }

  return {
    authorizeURL: authorizeURL,
    getToken: getToken
  };
};
