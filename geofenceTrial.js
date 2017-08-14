const client = require('./connection');
function main(){
  client.search({
  index: 'locations',
  type: 'location',
  body:{
    "query": {
        "bool" : {
            "must" : {
                "match_all" : {}
            },
            "filter" : {
                "geo_bounding_box" : {
                    "pin.location" : {
                        "top_left" : [-74.1, 40.73],
                        "bottom_right" : [-71.12, 40.01]
                    }
                }
            }
        }
    }
}
  }, function (error, response,status) {
      if(error){
        console.log(error)
      }else{
        var result = response.hits.hits
        console.log(result, status)
        //loadModules(result,files)
      }
  });
}