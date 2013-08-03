
var editdistance = require('./editdistance.js');
var test = require('tap').test;

var compare = editdistance('hallo world how are you');

test('test some simple distances', function (t) {
	t.equal(compare.distance('hallo world how are you'), 0);
	t.equal(compare.distance('hallw world how are you'), 1);
	t.equal(compare.distance('my name is fox'), 19);
	t.equal(compare.distance('icecream'), 21);
	t.equal(compare.distance('hallo world how are you today'), 6);
	t.end();
});
