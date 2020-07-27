function convert_string_timestamp(date){
  var str = date.getFullYear()
    + '/' + ('0' + (date.getMonth() + 1)).slice(-2)
    + '/' + ('0' + date.getDate()).slice(-2)
    + ' ' + ('0' + date.getHours()).slice(-2)
    + ':' + ('0' + date.getMinutes()).slice(-2)
    + ':' + ('0' + date.getSeconds()).slice(-2)
    + ':' + ('00' + date.getMilliseconds()).slice(-3)
    + '(JST)';
  return str;
};


class TimeAdjustByPerformance{
  constructor(){
    //NTP client query send time [msec] : float
    this.MesurementStartTime=performance.now();
    //Whether the reference time has already been set
    this.setStanderdTimeReady=false;
  }

  set_standerd_unixTime(jsondata){
    /*Set Standerd Time to get accuracy timestamp*/

    //NTP client query response received time
    this.MesurementEndTime=performance.now();
    var roundtripTime=(this.MesurementEndTime-this.MesurementStartTime);
    console.log(roundtripTime/2);
    this.standerdTime=jsondata.st+(roundtripTime/2)/1000;
    console.log("stand",this.standerdTime);
    console.log("date",this.get_now_time_stamp())
    this.setStanderdTimeReady=true;
    return this.standerdTime;
  }

  get_now_time_stamp(){
    var now_unixTime=this.standerdTime+(performance.now()-this.MesurementEndTime)/1000;
    var now_timeStamp = this.convert_date(now_unixTime);
    return now_timeStamp;
  }

  get_now_unix_time_stamp(){
    var now_unixTime=this.standerdTime+(performance.now()-this.MesurementEndTime)/1000;
    return now_unixTime;
  }

  convert_date(unixTime){
    var timeStamp = new Date( unixTime*1000 );
    return timeStamp;

  }

  console_out_now_time_stamp(){
    var timeStamp=this.get_now_time_stamp();
    console.log(convert_string_timestamp(timeStamp));
  }

};



function jsont(data){
  console.log("関数を呼び出しました");
  unixTime=timer.set_standerd_unixTime(data);
  var stamp = new Date( unixTime );
  var str= convert_string_timestamp(stamp);
  console.log("Standerd time by performance()",str);
};

function sleep(waitMsec) {
  var startMsec = new Date();
  while (new Date() - startMsec < waitMsec);
  console.log("wait 1sec");
};


var timer = new TimeAdjustByPerformance();
var sendTime = new Date().getTime();
var scriptE = document.createElement('script');
scriptE.src ='https://ntp-a1.nict.go.jp/cgi-bin/jsont';
document.body.appendChild(scriptE);
