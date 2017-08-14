const client = require('./connection');
const fs = require('fs');
const asyncLoop = require('node-async-loop');
const minutes = 1, the_interval = minutes * 60 * 10;
var files = fs.readdirSync('./modules/');


function loadModules(data,files){
  //console.log("loadModules")
  asyncLoop(files, function (file, next){
    require('./modules/'+file)(data)
    next(); 
  });
}

function main(){
  client.search({
  index: 'raw',
  type: 'raw',
  body:{
      "size": 60,
      "fields":["_timestamp","_source"],
      "sort":[{
        "GT":{
          "order": "asc"
        }
      }],
      "query": {
        "match_all": {}
      },
      "filter": {
          "range": {
             "_timestamp": {
                "gt": "now-23h"
             }
          }
      }
  }
  }, function (error, response) {
      if(error){
        console.log(error)
      }else{
        var result = response.hits.hits
        loadModules(result,files)
      }
  });
}

setInterval(function() {
  main()
}, the_interval);

