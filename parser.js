var json = require('gen-json-parser');
var I = require('immutable');

var identity = function (v) { return v; };

//  List & Map
exports.parseDefault = json.generate({
  null: identity,
  boolean: identity,
  number: identity,
  string: identity,
  array: I.List,
  object: I.Map
});
