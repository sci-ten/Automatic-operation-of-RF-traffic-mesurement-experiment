//import * from './video_part/schdule_playback.js';

function onPlayerReady(event) {
  //event.target.playVideo()
  playerState=new PlayerStateData(ytplayer);
  playerLog=new PlayerLogMaker();

  var nowUnixTimeStamp=timer.get_now_unix_time_stamp();
  var nowTimeStamp=  timer.convert_date(nowUnixTimeStamp);
  var nowTimeStampString=convert_string_timestamp(nowTimeStamp);
  var stateTag="Ready";
  var videoQuality=playerState.get_video_quality();

  var logtext=nowTimeStampString+" state:"+stateTag;
  add_log_scrollbar(logtext);

  var log=[nowTimeStampString,String(nowUnixTimeStamp),this.nowState,videoQuality];
  playerLog.push_log(log);

  console.log(player_parameter.quality);

  const sch=new SchdulePlayBack(timer,ytplayer,schdule);
  sch.run_schdule()
}


function onPlayerStateChange(event) {
  var state=ytplayer.getVideoLoadedFraction();

  stateTag=playerState.get_player_state_string(event);

  //get Now Timestamp
  var nowUnixTimeStamp=timer.get_now_unix_time_stamp();
  var nowTimeStamp=timer.convert_date(nowUnixTimeStamp);
  var nowTimeStampString=convert_string_timestamp(nowTimeStamp);

  //add player log to scroll bar in HTML
  var logtext=nowTimeStampString+" state: "+String(stateTag);
  add_log_scrollbar(logtext);

  //add player log to Array
  var log=[nowTimeStampString,String(nowUnixTimeStamp),stateTag,playerState.nowquality];
  playerLog.push_log(log);
}

function onPlaybackQualityChange(event){
  //get Video Quality
  var videoQuality=playerState.get_video_quality();

  //get Now Timestamp
  var nowUnixTimeStamp=timer.get_now_unix_time_stamp();
  var nowTimeStamp=timer.convert_date(nowUnixTimeStamp);
  var nowTimeStampString=convert_string_timestamp(nowTimeStamp);

  var log=[nowTimeStampString,String(nowUnixTimeStamp),this.nowState,videoQuality];
  playerLog.push_log(log);

  //add player log to scroll bar in HTML
  var logtext=nowTimeStampString+" state: Quality Changed:"+videoQuality;
  add_log_scrollbar(logtext);

  console.log("Video quality is changed");
}
