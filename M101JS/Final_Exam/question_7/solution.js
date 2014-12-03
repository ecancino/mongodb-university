#!/usr/bin/env node

var mongoc = require('mongodb').MongoClient;

mongoc.connect('mongodb://localhost/orphans', function (err, db) {
  if (err) throw err;

  var imgs = db.collection('images'),
      albs = db.collection('albums')
      limit = {}; //{ 'limit': 120 };

  imgs.find({}, {}, limit).toArray(function(err, images) {
    if (err) return console.error(err);

    images.forEach(function(img) {
      "use strict";

      albs.findOne({ 'images': img._id }, function(err, alb) {
        if (err) return console.error(err);

        if (!alb) {
          imgs.remove({ _id: img._id }, function(err, removed) {
            if (err) return console.error(err);
            console.dir("Successfully removed " + removed + " images!");
          });
        }
      });
    });
  });
});
