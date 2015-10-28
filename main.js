var xhr = require('xhr');
var queue = require('queue');
var taxon = {};

taxon.proxiedUrl = function(url) {
  var query = encodeURIComponent('select * from json where url="' + url + '"');
  var uri = 'http://query.yahooapis.com/v1/public/yql?q=' + query;
  return uri;
}

taxon.resolverUrlFor = function(names) {
  var namesString = encodeURIComponent(names.join('|'));
  var url = 'http://resolver.globalnames.org/name_resolvers.json?names=' + namesString + '&data_source_ids=12';
  return taxon.proxiedUrl(url);
};

taxon.eolPageIdsFor = function(names, callback) {
  var isExactMatch = function(result) { return ['1','2'].indexOf(result.match_type) != -1; };
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
    if (data && data.results) {
      if (Array.isArray(data.results)) {
        appendedIds = appendedIds.concat(extractPageIds(data.results));
      } else {
        if (isExactMatch(data.results)) {
          appendedIds = appendedIds.concat([data.results.local_id]);
        }
      }
    } 
    return appendedIds;  
  };

  var q = queue();
  q.timeout = 30000;
  var allPageIds = [];
  
  var uris = [];
  var nameChunkSize = 200;
  for (var i=0; i <= names.length / nameChunkSize; i++) {
    var start = i * nameChunkSize;
    var namesChunk = names.slice(start, start + nameChunkSize);
    var uri = taxon.resolverUrlFor(namesChunk);
    uris.push(uri);
  }

  uris.forEach(function(uri){
    q.push(function(cb) {
      xhr({
        uri: uri,
        headers: { 'Accept': 'application/json' }
      }, function (err, resp, body) {
        var pageIds = [];
        if (resp.statusCode == 200) {
          var result = JSON.parse(body);
            if (result.query && result.query.results && result.query.results.json) {
              var data = result.query.results.json.data;
              if (Array.isArray(data)) {
                pageIds = data.reduce(appendPageIds, pageIds);
              } else {
                pageIds = appendPageIds(pageIds, data);  
              }
            }
          } 
          Array.prototype.push.apply(allPageIds, pageIds);
          cb();
      });
    });
  });
  q.start(function(err) {
    callback(uniq(allPageIds));
  });
};

var uniq = function(ids) {
  return ids.filter(function(item, pos) {
    return ids.indexOf(item) == pos;
  });
}

taxon.saveAsCollection = function(callback, apiToken, ids, name, description) {
  var uniqueIds = uniq(ids);

  var items = uniqueIds.reduce(function(agg, id) { 
    return agg.concat([{collected_item_type: 'TaxonConcept', collected_item_id: id}]); },
    []);

  var collection = { name: (name || 'my name'), 
      description: (description || 'my description'),
      collection_items: items};
  
  var reqBody = JSON.stringify({ collection: collection });
  xhr({
    body: reqBody,
    method: 'POST',
    uri: 'http://effechecka-cors-proxy.herokuapp.com',
    headers: { 'Content-Type': 'application/json',
      'Target-URL': 'http://eol.org/wapi/collections',
      'Authorization': 'Token token="' + apiToken + '"' }
    }, function (err, resp, body) {
    if (resp.statusCode == 201) {
      var collectionId = JSON.parse(body).id;
      callback(collectionId, resp, reqBody);
    } else {
      callback(null, resp, reqBody);
    }
  });
}

module.exports = taxon;
