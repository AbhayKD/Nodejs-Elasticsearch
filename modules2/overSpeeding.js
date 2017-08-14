
module.exports = function(arg){
	for (i=0;i<arg.length;i++){
    var val = arg[i]._source.crpSet
    var data = JSON.parse(val.replace(":,",":0,"))
    //console.log(data)
    if(data[0].EV != undefined){
    	console.log("Over Speed Detected!===","Mobile Netwrok", data[0].MC )
      console.log("Time---", data[0].GT)
    }
  }
}