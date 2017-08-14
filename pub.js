const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://127.0.0.1')

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


function send() {
  client.subscribe('presence')

  require('fs').readFile('./sample.json', 'utf8', function (err, data) {
    var obj = JSON.parse(data);
    //console.log(obj)
    for(i=0; i<obj.length;++i){
      console.log(obj[i])
      client.publish('presence', obj[i]);
      sleep(50)
    }
  });
}

client.on('connect', send)
