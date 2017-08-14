
module.exports = function(arg){
  console.log("***************Hard Breaking*************")
	var localStorage = require('localStorage')
	var prevTime = 0;
	var prevSpeed = 0; 
	var curTime, curSpeed;
	var speedDelta;

	function calOverSpeed(curTime,prevTime,curSpeed,prevSpeed){
		speedDelta = (prevSpeed - curSpeed)/(curTime - prevTime)
		console.log("speedDelta---------------------", speedDelta)
		return speedDelta
	}

  function hardBreaking(){
    for (i=0;i<arg.length;i++){
      arrayCheck = arg[i]._source.rawSet
      if(Array.isArray(arrayCheck)){
        var val = arg[i]._source.rawSet[0]
        console.log(val.GT, "HB", val.SP)
        curTime = val.GT
        curSpeed = val.SP
        if(localStorage.getItem('speedTime') == null && prevTime == 0 ){//First time first time
    		  prevTime = val.GT
    		  prevSpeed = val.SP
        }else if(localStorage.getItem('speedTime') == null && prevTime != 0){//First time rest time
    		  calOverSpeed(curTime,prevTime,curSpeed,prevSpeed)
    		  if(speedDelta > 0.3){
				    console.log("-------------------------------------------------------Hard Breaking Detected")
		      }
		      prevTime = curTime
		      prevSpeed = curSpeed
        }else if(localStorage.getItem('speedTime') != null && prevTime != 0){//Next time first time
    		  calOverSpeed(curTime,prevTime,curSpeed,prevSpeed)
    		  if(speedDelta > 0.3){
				    console.log("-------------------------------------------------------Hard Breaking Detected")
		      }
          prevTime = curTime
		      prevSpeed = curSpeed
        }else{//Next time rest time
    		  lastSpeedTime = localStorage.getItem('speedTime');
    		  prevTime = lastSpeedTime.time
    		  prevSpeed = lastSpeedTime.speed
        }

        if (i == arg.length-1){
    		  speedTime = {speed: curSpeed, time: curTime}
    		  localStorage.setItem('speedTime', JSON.stringify(speedTime))
    		  //console.log(localStorage.getItem('speedTime'))
        }
      }else continue
  	}
  }
  hardBreaking()

}