var test = require('tape');
var gn = require('../');

test('url for Homo sapiens', function(t) {
  t.plan(1);
  var url = gn.resolverUrlFor(['Homo sapiens']);
  var expectedUrl = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Fresolver.globalnames.org%2Fname_resolvers.json%3Fnames%3DHomo%2520sapiens%26data_source_ids%3D12%22';
  t.equal(url, expectedUrl);
});

test('url for Homo sapiens and Anas', function(t) {
  t.plan(1);
  var url = gn.resolverUrlFor(['Homo sapiens', 'Anas']);
  var expectedUrl = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22http%3A%2F%2Fresolver.globalnames.org%2Fname_resolvers.json%3Fnames%3DHomo%2520sapiens%257CAnas%26data_source_ids%3D12%22';
  t.equal(url, expectedUrl);
});
