var test = require('tape');
var taxon = require('../../');

test.skip('create a collection', function(t) {
  t.plan(1);
  var token = '[your eol.org api token here]';
  taxon.saveAsCollection(function(collectionId) { t.ok(collectionId > 0); }, token, [1,918802]);
});


test('create a collection invalid token', function(t) {
  t.plan(1);
  var token = 'nothing';
  taxon.saveAsCollection(function(collectionId) { t.notOk(collectionId > 0); }, token, [1]);
});

