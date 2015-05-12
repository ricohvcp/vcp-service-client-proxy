var superagent_proxy = require('superagent-proxy');
var URL = require('url');

module.exports = function(setting) {
  setting = setting || {};

  return function(req) {
    var url = URL.parse(req.url);
    var proxy_url;

    // select http/https proxy from setting or env
    // and adding port number to url for superagent-proxy
    switch (url.protocol) {
      case 'http:':
        proxy_url = setting.http || process.env.HTTP_PROXY;
        if (url.port === null) {
          url.port = '80';
          url.host += ':80';
        }
        break;
      case 'https:':
        proxy_url = setting.https || process.env.HTTPS_PROXY;
        if (url.port === null) {
          url.port = '443';
          url.host += ':443';
        }
        break;
      default:
        throw new Error('unsupported protocol');
    }

    req.url = URL.format(url);
    superagent_proxy(req, proxy_url);
  };
};
