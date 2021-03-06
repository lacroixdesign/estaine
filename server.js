// new relic
if(process.env.NEW_RELIC_LICENSE_KEY) {
  require('newrelic');
}

var express  = require('express')
  , http     = require('http')
  , path     = require('path');

var app = module.exports = express();

// assets
app.use(express.compress());
require('./config/assets')(app);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.cookieSession({ secret: '_estaine_b2685bd0cb9a9048ae923e3359c3903e3bbe' }));

// config
require('./config/env')(app, express);

// include any custom middleware before this app.router
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// global helpers
require('./lib/helpers')(app);
app.locals.errors  = {};
app.locals.message = {};

// routes
require('./config/routes')(app);

// start server
if (!module.parent) {
  http.createServer(app).listen(app.get('port'), function() {
    console.log('Server listening on port ' + app.get('port'));
  });
}
