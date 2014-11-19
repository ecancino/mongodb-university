var app = require('express')(),
    swig = require('consolidate').swig,
    bodyParser = require('body-parser'),
    moment = require('moment')();

app.engine('html', swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: false}));

// Handler for internal server errors
app.use(function errorHandler (err, req, res, next) {
  console.log(err);
  res.status(500).render('error_template', { error: err.message });
  next(err);
});

// a middleware with no mount path; gets executed for every request to the app
app.use(function logTime (req, res, next) {
  console.log('Time:', moment.format('MMMM Do YYYY, h:mm:ss a'));
  console.log('Params:', req.body);
  next();
});

app.get('/', function root (req, res, next) {
  res.render('fruit_picker', { 'fruits': [ 'apple', 'orange', 'banana', 'peach' ] });
});

app.post('/favorite_fruit', function favorite (req, res, next) {
  var favorite = req.body.fruit || '';
  if (favorite.trim() == '') {
    next(Error('Please choose a fruit!'));
  } else {
    res.render('favorite', { 'favorite': favorite });
  }
});

app.listen(3000);
console.log('Express server listening on port 3000');
