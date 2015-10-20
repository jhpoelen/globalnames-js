var xhr = require('xhr');
var taxon = {};

taxon.resolverUrlFor = function(names) {
  var namesString = encodeURIComponent(names.join('|'));
  var proxiedUrl = 'http://resolver.globalnames.org/name_resolvers.json?names=' + namesString + '&data_source_ids=12';
  var query = encodeURIComponent('select * from json where url="' + proxiedUrl + '"');
  var uri = 'http://query.yahooapis.com/v1/public/yql?q=' + query;
  return uri;
};

taxon.eolPageIdsFor = function(names, callback) {
  var isExactMatch = function(result) { return ['1','2'].indexOf(result.match_type) != -1; };
  var uri = taxon.resolverUrlFor(names);
  var extractPageIds = function(results) {
    var urlHash = results.reduce(function(agg, result) {
      if (isExactMatch(result)) {
        agg[result.local_id] = result.local_id;
      }
      return agg;
    }, {});
    return Object.keys(urlHash); 
  };

  var appendPageIds = function(ids, data) {
    appendedIds = [].concat(ids);
    if (Array.isArray(data.results)) {
      appendedIds = appendedIds.concat(extractPageIds(data.results));
    } else if (data.results) {
      if (isExactMatch(data.results)) {
        appendedIds = appendedIds.concat([data.results.local_id]);
      }
    } 
    return appendedIds;  
  };

  xhr({
    uri: uri,
    headers: { 'Accept': 'application/json' }
  }, function (err, resp, body) {
    if (resp.statusCode == 200) {
      var result = JSON.parse(body);
      if (result) {
        var data = result.query.results.json.data;
        var pageIds = [];
        if (Array.isArray(data)) {
          pageIds = data.reduce(appendPageIds, pageIds);
        } else {
          pageIds = appendPageIds(pageIds, data);  
        }
        callback(pageIds);
      }
    }
  });
};

module.exports = taxon;
