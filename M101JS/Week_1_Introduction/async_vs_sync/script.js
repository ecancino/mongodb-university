// move to demo db
db = db.getSiblingDB('demo');

// Find one document in our collection
var doc = db.coll.findOne();

// Print the result
printjson(doc);
