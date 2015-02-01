var json = require('gen-json-parser');
var I = require('immutable');

var identity = function (v) { return v; };
var withId = function (v) { return [v, identity] };
var base = I.Map(I.List(
  ['null', 'boolean', 'string', 'number']
).map(withId));

var parseWith = function (array, object) {
  var config = base.merge(I.Map([
    ['array', array],
    ['object', object]
  ]));
  return json.generate(config.toJS());
};

exports.parseWith = parseWith;
exports.parse = {
  ListMap:       parseWith(I.List, I.Map),
  SeqMap:        parseWith(I.Seq, I.Map),
  SetMap:        parseWith(I.Set, I.Map),
  SetMapOrdered: parseWith(I.OrderedSet, I.OrderedMap)
};

