const elastic = require('../connection');

module.exports = function(arg){
	console.log("***************GPS Positions*****************")

	function getLatLng(str){
		var first = str.substr(0,1)
		var second = str.substr(1)

		return parseFloat((second/60)+first).toFixed(4)
	}

	function locationData(lat,lon){
  	console.log("Inserting locationData")
  	elastic.index({
    	index: 'locations',
    	type: 'location',
    	refresh: true,
    	body: {
      	"lat": lat,
      	"lon": lon
    	}
  	},function(err,resp) {
  		if(err){
      	console.log(err);
      }
  	});
	}



	for (i=0;i<arg.length;i++){
		arrayCheck = arg[i]._source.rawSet
    if(Array.isArray(arrayCheck)){
    	var val = arg[i]._source.rawSet[0]
    	//console.log(val, "LATLNG");
    	var index = val.G.indexOf(",")
			var N = val.G.substr(0, index-2) 
			var E = val.G.substr(index + 1, val.G.length-13)
      lat = getLatLng(N)
      lon = getLatLng(E)
    	console.log("Latitude-----", lat, "     ", "Longitude------", lon)

    	locationData(lat, lon)
    }else continue
	}
	
}