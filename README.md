# taxon

Lookup taxon ids by name using [Global Names Resolver](http://resolver.globalnames.org).

[![build status](https://secure.travis-ci.org/jhpoelen/node-taxon.png)](http://travis-ci.org/jhpoelen/node-taxon)

# getting started 

Run ```npm install taxon --save``` to install and add to your package.json .

# example

Lookup an eol page id for a list of names.

```js
var taxon = require('taxon');

var ids = taxon.eolPageIdsForNames(['Homo sapiens', 'Enhydra lutris']);

# expected results: ['327955', '328583']
```



