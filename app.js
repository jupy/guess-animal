var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./controllers/index');
var users = require('./controllers/users');
var nodes = require('./controllers/nodes');

var c = require(path.join(__dirname, 'lib', 'colors'));

var app = express();

app.set('port', process.env.PORT || 3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

function logErrors(err, req, res, next) {
  if (typeof err === 'string')
    err = new Error (err);
  console.error('logErrors', err.toString());
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  if (req.xhr) {
    console.error('clientErrors response');
    res.status(500).json({ error: err.toString()});
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  console.error('lastErrors response');
  res.status(500).send(err.toString());
}

if (app.get('env') === 'development') {
  app.use(require('connect-livereload')({
    src: "http://localhost:35729/js/livereload.js?snipver=1",
    port: 35729
    // include: [/.*/],
    // src: "http://localhost:3000/js/livereload.js?snipver=1",
    // port: 3000
  }));
}

app.use('/', index);
app.use('/users', users);
app.use('/nodes', nodes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

if (require.main === module) {
  var server = http.createServer(app)
  server.listen(app.get('port'), function(){
    console.info(c.yellow + 'Guess-animal server listening on port ' + app.get('port') + c.reset);
  });
}
else {
  console.info(c.yellow + 'Running app as a module' + c.reset)
  module.exports = app;
}

//module.exports = app;
