var util = require('util');
var assert = require('assert');

var I = require('immutable');
var IJSON = require('../parser');

//  assert Immutable equality
var eq = function (l, r) {
  assert(I.is(l, r), util.format('%s != %s', l, r));
};

//  Test case constructor
var TestCase = function (json, expect) {
  return { json: json, expect: expect };
};

//  A passing test
var pass = function (name, parser, testCase) {
  it(name, function () {
    eq(parser(testCase.json).value, testCase.expect);
  });
};

//  Appropriate constructors for interpreting JSON arrays
var arrays = I.Map([
  ['Seq', I.Seq],
  ['List', I.List],
  ['Set', I.Set],
  ['OrderedSet', I.OrderedSet]
]);

//  Appropriate constructors for interpreting JSON objects
var objects = I.Map([
  ['Map', I.Map],
  ['OrderedMap', I.OrderedMap]
]);


describe('Generated, uses "__proto__" as a key', function () {

  //  Test data generation
  var empty = TestCase('null', null);
  var genData = function (seq, map) {
    return function (inner) {
      return TestCase(
        '{ "__proto__": [' + inner.json + '] }',
        map([ ['__proto__', seq([inner.expect])] ])
      );
    };
  };

  arrays.forEach(function (array, arrayName) {
    objects.forEach(function (object, objectName) {

      var name = util.format('Combination: %s & %s', arrayName, objectName);
      var testCase = I.Range(0, 100).reduce(genData(array, object), empty);
      var parser = IJSON.parseWith(array, object);
      pass(name, parser, testCase);

    });
  });

});
