
class SchdulePlayBack{

  constructor(timer,ytplayer,schdule){
      this.ytplayer=ytplayer
      this.schdule=schdule
      this.timer=timer
  }

  run_schdule(){
    console.log("call",this.schdule);
    console.log("call",this.schdule.length);
    for (var i = 0, len = this.schdule.length; i < len; ++i) {
      var now=timer.get_now_unix_time_stamp()
      console.log("now",now,i)
      var job=this.schdule[i]
      //console.log("diff",job.run_time-now);

      console.log(get_job(job.process));

      if ( (job.run_time>now)&&(get_job(job.process)!=null) ) {
          //diff
          var wait_sec=job.run_time-now;
          //console.log("wait job",wait_sec*1000)
          var process=get_job(job.process);
          //console.log(process)
          setTimeout(process, wait_sec*1000);
      }
    }
  }

}


function playVideo(){
  ytplayer.playVideo();
  ytplayer.setPlaybackQuality(player_parameter.quality);
  console.log(player_parameter.quality);
}

function stopVideo() {
     ytplayer.pauseVideo();
     /*
     var nowUnixTimeStamp=timer.get_now_unix_time_stamp();
     var nowTimeStamp=timer.convert_date(nowUnixTimeStamp);
     var nowTimeStampString=convert_string_timestamp(nowTimeStamp);
     stateTag="PAUSED"
     //push log
     var log=[nowTimeStampString,String(nowUnixTimeStamp),stateTag,playerState.nowquality];
     playerLog.push_log(log);
     */
     var nowUnixTimeStamp=timer.get_now_unix_time_stamp();
     var nowTimeStamp=timer.convert_date(nowUnixTimeStamp);
     var nowTimeStampString=convert_string_timestamp(nowTimeStamp);

     sleep(2000);
     var filename="\player-"+ nowTimeStampString+".csv"
     playerLog.save_log(filename);
     sleep(1000);

     location.reload();
}

function get_job(job_str){

  if (typeof job_str !=='string'){
    return null;
  }

  if (job_str.indexOf('play') !== -1) {
    //window.alart("含まれています");
    //console.log("ふくまれています");
    return playVideo;
  }else if(job_str.indexOf('stop') !== -1){
    return stopVideo;
  }else if(job_str.indexOf('pause') !== -1){
    return ytplayer.pauseVideo;
  }else if(job_str.indexOf('reload') !== -1){
    return location.reload;
  }else{
     return null;
  }

}
