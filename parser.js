var json = require('gen-json-parser');
var I = require('immutable');

var identity = function (v) { return v; };
var withId = function (v) { return [v, identity] };
var base = I.Map(I.List(
  ['null', 'boolean', 'string', 'number']
).map(withId));

var generate = function (array, object) {
  var config = base.merge(I.Map([
    ['array', array],
    ['object', object]
  ]));
  return json.generate(config.toJS());
};

exports.generate = generate;
exports.parse = {
  list_map: generate(I.List, I.Map),
  seq_map: generate(I.Seq, I.Map),
  set_map: {
    normal: generate(I.Set, I.Map),
    ordered: generate(I.OrderedSet, I.OrderedMap)
  }
};

