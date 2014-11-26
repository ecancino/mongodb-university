#!/usr/bin/env node

var mongoc = require('mongodb').MongoClient;

var protocol = 'mongodb://',
    replica_set = [
      'localhost:27018',
      'localhost:27017',
      'localhost:27019'
    ],
    database = 'course',
    write_concern = replica_set.length,
    connection_string = [
      protocol,
      replica_set.join(','),
      '/', database,
      '?w=', write_concern
    ].join('');

mongoc.connect(connection_string, function (err, db) {
  "use strict";
  if (err) throw err;

  var repl = db.collection('repl');
  // Write concern of one
  repl.insert({ 'x' : 1 }, function(err, doc) {
    if (err) throw err;

    console.log(doc);

    // Write concern of two
    repl.insert({ 'x' : 2 }, { 'w' : 2 }, function(err, doc) {
      if (err) throw err;

      console.log(doc);

      db.close();
    });
  });
});
