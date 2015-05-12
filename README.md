# vcp-service-client

[![npm version](https://badge.fury.io/js/vcp-service-client-proxy.svg)](http://badge.fury.io/js/vcp-service-client-proxy)
[![Dependency Status](https://gemnasium.com/ricohvcp/vcp-service-client-proxy.svg)](https://gemnasium.com/ricohvcp/vcp-service-client-proxy)


## DESCRIPTION

proxy support for vcp-service-client on node/io.js


## install

```sh
$ npm install vcp-service-client-proxy
```

## API

set proxy url to value, or default info is lookup from `$HTTP_PROXY`, `$HTTPS_PROXY` local env.

```js
var Proxy = require('vcp-service-client-proxy');

// set proxy pass
var proxy = Proxy({ http: 'http://user:pass@proxy.com', https: 'https://user:pass@proxy.com' });


// default arguments is process.env.HTTP(s)_PROXY
var proxy = Proxy();
```

this is only for node/io.js, not for browser.
in browser, set the proxy info on browser setting menue.


## Example

pass Proxy to `vcp-service-client` params like below.

```js
var Proxy = require('vcp-service-client-proxy');
var VCPClient = require('vcp-service-client').VCPClient;

var proxy = Proxy({ http: 'http://proxy.com', https: 'https://proxy.com' });
//  proxy = Proxy(); default arguments is process.env.HTTP(s)_PROXY

var params = {
  client_id: client_id,
  client_secret: client_secret,
  ...
  proxy: proxy // add proxy
};

var client = new VCPClient(endpoint, params);
client.auth().then(function() {
  ...
});
```

in browser usage, set correct value to browser not modify code.


## test

```
$ npm test
```

## tasks

all tasks could run from npm command.

```sh
## check js style and config files
$ npm run lint

## running tst
$ npm tst
```

## LICENSE

MIT
