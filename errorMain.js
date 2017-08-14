const client = require('./connection');
const fs = require('fs');
var files = fs.readdirSync('./modules2/');

/*function callModules(result){
  loadModules(result)
}*/

function loadModules(data){
  //console.log("loadModules")
  console.log(files)
  for (i = 0; i < files.length ; i++) {
    //console.log(files[i])
    var mod = require('./modules2/'+files[i])(data);
    //console.log(mod)
  }
}

client.search({
  index: 'error',
  type: 'error',
  body:{
      "size": 48,
      "fields":["_timestamp","_source"],
      "query": {
        "match_all": {}
      },
      "filter": {
          "range": {
             "_timestamp": {
                "gt": "now-8h"
             }
          }
      }
   }
}, function (error, response) {
  var result = response.hits.hits
  loadModules(result)
});