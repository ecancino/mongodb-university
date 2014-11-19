#!/usr/bin/env node

var mongoc = require('mongodb').MongoClient;

mongoc.connect('mongodb://localhost:27017/test', function(err, db) {
  if (err) return console.error(err);

  var people = db.collection('people'),
    search = { 'name':'Kevin' },
    hint = { 'hint': { '_id': 1 } },
    cursor = people.find(search, {}, hint);

  cursor.explain(function(err, explanation) {
    if (err) return console.error(err);

    console.log(explanation);

    db.close();
  });
});
