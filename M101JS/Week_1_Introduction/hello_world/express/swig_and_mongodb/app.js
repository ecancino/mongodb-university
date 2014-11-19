var app = require('express')(),
    swig = require('consolidate').swig,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;

app.engine('html', swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

var mongoclient = new MongoClient(new Server("localhost", 27017));
var db = mongoclient.db('course');

app.get('/', function (req, res) {

  // Find one document in our collection
  db.collection('hello_combined').findOne({}, function (err, doc) {

    if (err) throw err;

    res.render('hello', doc);
  });
});

app.get('*', function (req, res) {
  res.status(404).send('Page Not Found');
});

mongoclient.open(function (err, mongoclient) {

  if (err) throw err;

  app.listen(8080);
  console.log('Express server started on port 8080');
});
