var test = require('tape');
var gn = require('../../');

test('get page id for Homo sapiens and Enhydra lutris', function(t) {
  t.plan(1);
  var ids = gn.eolPageIdsFor(['Homo sapiens', 'Enhydra lutris'], function(pageIds) {
    t.deepEquals(pageIds, ['327955', '328583']);
  });
});

test('get page id for Homo sapiens', function (t) {
    t.plan(1);
    var testCallback = function(pageIds) {
      t.deepEquals(pageIds, ['327955']);
    };
    var names = ['Homo sapiens'];
    gn.eolPageIdsFor(names, testCallback);
});

test('get page id for Homo sapiens', function (t) {
    t.plan(1);
    var testCallback = function(pageIds) {
      t.deepEquals(pageIds, []);
    };
    var names = ['Homo sapiensz'];
    gn.eolPageIdsFor(names, testCallback);
});






