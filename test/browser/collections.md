Write API (WAPI)

A) You'll want to pass the version of the API you're using in the headers, using something like "Accept: application/vnd.eol_wapi.v1" (for version 1 of the API). This will keep things stable, so the developers can work on new features without breaking your code. 

B) You'll need to pass your user’s api_key in the header as well, with the "Authorization" key, and it's encrypted. I'm not sure what this looks like in PHP, but in Rails, this looks something like this (YMMV): 
get 'http://eol.org/wapi/collections/', 
{},
{ "HTTP_AUTHORIZATION" :  HttpAuthentication::Token.encode_credentials("1234123") }
 It's a little more elegant (if redundant) with curl: 
curl http://eol.org/wapi/collections -H 'Authorization: Token token="1234123"’ 

D) The params will look more like a typical Rails API, so the params will be like this (pretending it's JSON for clarity): 
collection:{
name:"Something cool",
description:"lots of important stuff here",
collection_items:[{
"annotation":"Something interesting",
"collected_item_id":75,
"collected_item_type":"TaxonConcept",
"sort_field":"12"}] 
} 
note that, the annotation and the sort_field attributes here are optional.

E) There are 5 method call you can use in the WAPI:

Index: 
This method is for  showing all the collections available on eol.org, you can use it as follows: 
 get 'http://eol.org/wapi/collections/’, 
{per_page:20, page:2}

Note that , “per_page” is an optional attribute and its default value is 30.
If the the page parameter is not passed, it will have value 1 by default.
Also, no authentication or api_key need to be passed with this call.



Show: 
This method for showing a specific collection. It can be called as follows:
get 'http://eol.org/wapi/collections/COLLECTION_ID'
It will return the collection’s content with status ok if the collection exists, otherwise it will return null.
No authentication or api_key needed to be passed with this call.

Create: 
This method creates a new collection by passing the params of the collection wanted to be created with a list of the collected collection items, as follows: 
    post 'http://eol.org/wapi/collections/',
        {collection: {
          name: "name of the collection",
          collection_items: [
            {"annotation" : "item1",
             "collected_item_id" : 777,
             "collected_item_type" : "TaxonConcept",
             "sort_field" : "12"
            },
            {"annotation" : "item2",
             "collected_item_id" : 100,
             "collected_item_type" : "DataObject"
            }
          ]
        }},
        { HttpAuthentication::Token.encode_credentials(api_key)  }
Note that name, collection_items parameter is optional. 

Update: 
This methods updates the user’s current collection, by passing the collection’s ID in the URI and the full list of the new content of this collection.

put '/wapi/collections/COLLECTION_ID',
        {collection: {
          name: "name",
          collection_items: [
            {"annotation" : "item1",
             "collected_item_id" : 90,
             "collected_item_type" : "TaxonConcept",
             "sort_field" : "12"
            },
            {"annotation" : "item2",
             "collected_item_id" : 10000,
             "collected_item_type" : "Collection"
            }
          ]
        }},
        { "HTTP_AUTHORIZATION" : encode(@key) }
Authorization is needed for this method.The response will be a success message with status ok in case of successful 

Delete: 
This method is used for deleting the user’s collections, by passing the collection ID and the user’s api_key in the call, as follows: 
delete '/wapi/collections/COLLECTION_ID',
    { "HTTP_AUTHORIZATION" : encode(@key) }
The response will be a success message with status ok. Otherwise, the response will unauthorized status if the user doesn’t own the collection or  


