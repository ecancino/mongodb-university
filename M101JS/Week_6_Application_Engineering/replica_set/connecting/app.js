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

mongoc.connect(connection_string, function(err, db) {
    if (err) throw err;

    var repl = db.collection('repl');
    repl.insert({ 'x' : 1 }, function(err, doc) {
        if (err) throw err;

        repl.find().toArray(function(err, docs) {
          if(err) throw err;

          console.dir(docs);
          db.close();
        });
    });
});
