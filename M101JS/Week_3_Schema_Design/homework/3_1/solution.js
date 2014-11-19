#!/bin/env node

var mongoc = require('mongodb').MongoClient;

mongoc.connect('mongodb://localhost:27017/school', function (err, db) {
  if (err) {
    console.error(err);
    return false;
  }

  var students, cursor;
  students = db.collection('students');
  cursor = students.find({});

  cursor.each(function (err, doc) {
    if (err || doc == null) {
      return false;
    }

    var scores = doc.scores
          .filter(function (score) {
            return score.type == 'homework';
          })
          .map(function (score) {
            return score.score;
          }),
        minor = Math.min.apply(Math, scores);

    students.update({_id: doc._id }, { $pull: { scores: { score: minor, type: 'homework' } } }, {}, function (err, updated) {
      if (err || doc == null) {
        return false;
      }
      console.dir("Successfully updated " + updated + " documents!");
    });

  });

});
