
var express = require('express') ;

var path = require('path') ;
var cookieParser = require('cookie-parser') ;
var routes = require('./routes/') ;
var routesHTML = require('./routes/html') ;
var createError = require('http-errors') ;


var app = express() ;

// view engine setup to jade
app.set('views', path.join(__dirname, 'public', 'jade')) ;
app.set('view engine', 'jade') ;

// basic setup
app.use(express.json()) ;
app.use(express.urlencoded({ extended: false })) ;
app.use(cookieParser()) ;


// routes

// STATIC VERSION (html)
app.use('/html/', express.static(path.join(__dirname, 'public'))) ;
app.use('/html/', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'public', 'default.html')) ;
}) ;


app.use('/json/', function(req, res, next) {
  res.sendFile(path.join(__dirname, 'public', 'js/nodeless_app/examples/examples.json')) ;
}) ;

// DYNAMIC VERSION (Node Express Jade)
app.use('/', express.static(path.join(__dirname, 'public'))) ;
app.use('/', function(req, res, next) {
  res.render(path.join(__dirname, 'public/jade/index'), { title: 'BetweenJS :: Solid JS TweenEngine' }) ;
}) ;
/* 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404)) ;
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message ;
  res.locals.error = req.app.get('env') === 'development' ? err : {} ;

  // render the error page
  res.status(err.status || 500) ;
  res.render('error') ;
})
 */

module.exports = app ;