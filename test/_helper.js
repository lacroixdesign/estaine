process.env.NODE_ENV = 'test';

// import modules
var app     = require('../server')
  , http    = require('http')
  , Browser = require('zombie');

// set vars
var port = 3003
  , url  = 'http://localhost:' + port;

// export
module.exports = {
  app:  app,
  port: port,
  url:  url,

  server: function() {
    return http.createServer(app).listen(port);
  },

  browser: function() {
    return (new Browser({ site: url }));
  },

};
