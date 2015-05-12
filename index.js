var superagent-proxy = require('superagent-proxy');

module.exports = function(req) {
  let url = URL.parse(req.url);
  let proxy_url;

  // select http/https proxy from env
  // and adding port number to url for superagent-proxy
  switch (url.protocol) {
    case 'http:':
      proxy_url = process.env.HTTP_PROXY;
      if (url.port === null) {
        url.port = '80';
        url.host += ':80';
      }
      break;
    case 'https:':
      proxy_url = process.env.HTTPS_PROXY;
      if (url.port === null) {
        url.port = '443';
        url.host += ':443';
      }
      break;
    default:
      throw new Error('unsupported protocol');
  }

  superagent-proxy(req, proxy_url);
}
