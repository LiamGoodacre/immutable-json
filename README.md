# immutable-json

Parse JSON into immutable.js collections


`IJSON.parse` is a collection of parsers, each interpretting JSON Arrays and Objects in different ways:

* `IJSON.parse.ListMap` - views JSON Arrays as Immutable Lists, and Objects as Maps.
* `IJSON.parse.SeqMap` - views JSON Arrays as Immutable Seqs, and Objects as Maps.
* `IJSON.parse.SetMap` - views JSON Arrays as Immutable Sets, and Objects as Maps.
* `IJSON.parse.SetMapOrdered` - views JSON Arrays as Immutable OrderedSets, and Objects as OrderedMaps.


## Custom

If you need something that isn't in the presets, `IJSON.generate` can be used to build a new parser.  It takes two arguments: first argument is a function for how to interpret JSON Arrays (in the form of a JavaScript Array), second argument is for interpreting JSON Objects (in the form of a JavaScript Array of Pairs).

~~~javascript
var I = require('immutable');
var IJSON = require('immutable-json');
var parse = IJSON.parseWith(I.Seq, I.OrderedMap);

parser('[{"foo": "bar"}]').value;
> Seq [ OrderedMap { foo: "bar" } ]
~~~

