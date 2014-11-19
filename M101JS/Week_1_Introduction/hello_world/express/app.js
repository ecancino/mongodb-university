var express = require('express'),
    app = express();

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('*', function (req, res) {
  res.status(404).send('Page Not Found');
});

app.listen(8080);
console.log('Express server started on port 8080');

