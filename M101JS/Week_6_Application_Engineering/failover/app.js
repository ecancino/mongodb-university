#!/usr/bin/env node

var mongoc = require('mongodb').MongoClient;

var protocol = 'mongodb://',
    replica_set = [
      'localhost:27018',
      'localhost:27017',
      'localhost:27019'
    ],
    database = 'course',
    connection_string = [
      protocol,
      replica_set.join(','),
      '/',
      database
    ].join('');

mongoc.connect(connection_string, function (err, db) {
  if (err) throw err;

  var documentNumber = 0;
  (function insertDocument () {
    var repl = db.collection('repl')
    repl.insert({ 'documentNumber': documentNumber++ }, function (err, doc) {
      if (err) throw err;
      console.log(doc);
    });
    console.log('Dispatched insert');
    setTimeout(insertDocument, 1000);
  })();

});
