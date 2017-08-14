
const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://127.0.0.1')
const elastic = require('./connection');

function rawData(obj){
  console.log("Inside rawData")
  elastic.index({
    index: 'raw',
    type: 'raw',
    refresh: true,
    body: {
      "rawSet": obj
    }
  },function(err,resp,function() {
      console.log(status);
  })
}

function errorData(obj){
  console.log("Inside errorData")
  //console.log(obj)
  elastic.index({
    type: 'error',
    index: 'error',
    refresh: true,
    body: {
      "crpSet": obj
    } 
  },function(err,resp,status) {
      console.log(status);
  })
}


function init(){
  client.on('connect', function () {
    client.subscribe('presence')
    client.on('message', function (topic, message) {
      // JSON.parse(message)
      //   ? rawData(JSON.parse(message))
      //   : errorData(message.toString('utf-8'))
      
      try{
        var data = JSON.parse(message)
        console.log("thrhgst")
        rawData(data)
      }
      catch(err){
        console.log("Corrupt Data found!!")
        var corruptData = message.toString('utf-8'); 
        errorData(corruptData);
      }
    });
  });
}

init();
