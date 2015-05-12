var assert = require('assert');
var superagent = require('superagent');
var Proxy = require('../');

describe('Proxy test', function() {
  describe('implicit', function() {
    it('http', function() {
      var proxy = Proxy();
      var req = superagent.get('http://example.com');
      proxy(req);
      assert.strictEqual(req._proxyUri, process.env.HTTP_PROXY);
    });

    it('https', function() {
      var proxy = Proxy();
      var req = superagent.get('https://example.com');
      proxy(req);
      assert.strictEqual(req._proxyUri, process.env.HTTPS_PROXY);
    });
  });

  describe('explicit', function() {
    it('http', function() {
      var http_proxy = 'http://proxy.com';

      var proxy = Proxy({ http: http_proxy });
      var req = superagent.get('http://example.com');
      proxy(req);
      assert.strictEqual(req._proxyUri, http_proxy);
    });

    it('https', function() {
      var https_proxy = 'https://proxy.com';

      var proxy = Proxy({ https: https_proxy });
      var req = superagent.get('https://example.com');
      proxy(req);
      assert.strictEqual(req._proxyUri, https_proxy);
    });
  });

  describe('port complement', function() {
    it('http default', function() {
      var proxy = Proxy();
      var req = superagent.get('http://example.com');
      proxy(req);

      assert.strictEqual(req._url, 'http://example.com:80/');
    });

    it('http explicit', function() {
      var proxy = Proxy();
      var req = superagent.get('http://example.com:8080');
      proxy(req);

      assert.strictEqual(req._url, 'http://example.com:8080/');
    });

    it('https default', function() {
      var proxy = Proxy();
      var req = superagent.get('https://example.com');
      proxy(req);

      assert.strictEqual(req._url, 'https://example.com:443/');
    });

    it('https explicit', function() {
      var proxy = Proxy();
      var req = superagent.get('https://example.com:8443');
      proxy(req);

      assert.strictEqual(req._url, 'https://example.com:8443/');
    });
  });

  describe('error', function() {
    it('mqtt:', function() {
      var proxy = Proxy();
      var req = superagent.get('mqtt://example.com:8443');

      try {
        proxy(req);
        assert.fail('cant be here');
      } catch(err) {
        assert.strictEqual(err.message, 'unsupported protocol');
      }
    });
  });
});
