var test = require('tape');
var taxon = require('../');


test('replace pipes with dots', function(t) {
    t.plan(2);
    t.equal(taxon.pipesToDots("one | two | three |"), "one.two.three");
    t.equal(taxon.pipesToDots("one | two | three"), "one.two.three");
});

test('generate short tail key for taxon path', function(t) {
    t.plan(2);
    t.equal(taxon.shortKeyFor("one | two | three | four"), "two.three.four");
    t.equal(taxon.shortKeyFor("one | two"), "one.two");
});
