#!/usr/bin/env node

var mongo = require('mongodb'),
    mongoc = mongo.MongoClient,
    rdprf = mongo.ReadPreference;

var protocol = 'mongodb://',
    replica_set = [
      'localhost:27018',
      'localhost:27017',
      'localhost:27019'
    ],
    database = 'course',
    write_concern = replica_set.length,
    read_preference = 'secondary',
    connection_string = [
      protocol,
      replica_set.join(','),
      '/', database,
      '?w=', write_concern,
      '&readPreference=', read_preference
    ].join('');

mongoc.connect(connection_string, function (err, db) {
  if (err) throw err;

  var repl = db.collection('repl');

  repl.insert({ 'x' : 1 }, function(err, doc) {
    if (err) throw err;
    console.log(doc);
  });

  (function findDocument() {

    //repl.findOne({ 'x' : 1 }, { 'readPreference' : rdprf.PRIMARY }, function(err, doc) {
    repl.findOne({ 'x' : 1 }, function(err, doc) {
        if (err) throw err;
        console.log(doc);
    });

    console.log('Dispatched find');
    setTimeout(findDocument, 1000);
  })();

});
