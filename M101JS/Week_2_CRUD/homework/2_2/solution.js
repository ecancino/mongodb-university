#!/bin/env node

var mongoc = require('mongodb').MongoClient,
  limit = +process.argv[2] || 20;

mongoc.connect('mongodb://localhost:27017/weather', function(err, db) {
  if(err) throw err;

  var weather = db.collection('data');
  var cursor = weather.find({}).sort([['State', 1], ['Temperature', -1]]);

  var last = { '_id': '' };

  cursor.each(function(err, doc) {
    if (err) {
      console.log(err.message);
      return false;
    }
    if(doc == null) return false;

    if (last.State != doc.State) {
      weather.update(doc, { '$set': { 'month_high' : true } }, { 'new': true }, function(err, updated) {
        if(err) { console.log(err.message); return false; }
        console.dir("Successfully updated " + updated + " document!");
      });
    }

    last = doc
  });

});
