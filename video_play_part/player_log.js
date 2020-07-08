//ytplayer is global variable defined in iframe_part.js for iframe instance
class PlayerStateData{
  constructor(ytplayer){
    /*
      typlayer: object of Youtube iframe API
    */
    //target youtube player
    this.ytplayer=ytplayer;
    this.nowquality; //String
    this.nowState;  //String
  }

  get_video_quality(){
    const videoResolution={
      "hd2160": "2160p",
      "hd1080": "1080p",
      "hd1440": "1440p",
      "hd720" : "720p",
      "large" : "480p",
      "medium": "360p",
      "small" : "240p",
      "tiny"  : "144p"
    }
    this.nowquality=videoResolution[this.ytplayer.getPlaybackQuality()];
    return this.nowquality;
  }

  get_player_state_string(event){
      this.nowState;
      switch(event.data){
          case YT.PlayerState.ENDED:
             this.nowState="ENDED";
             break;
          case YT.PlayerState.PLAYING:
             this.nowState="PLAYING "
             break;
          case YT.PlayerState.PAUSED:
             this.nowState="PAUSED";
             break;
          case YT.PlayerState.BUFFERING:
             this.nowState="BUFFERING";
             break;
          case YT.PlayerState.CUED:
             this.nowStatethis.nowState="CUED";
             break;
          case YT.PlayerState.UNSTARTED:
             this.nowState="Unstarted";
             break;
       }
       return this.nowState;
  }

}


class PlayerLogMaker{

  constructor(){
    this.playerLog=[['TimeStamp','UnixTime','State','Quality']];
      //['TimeStamp','State','Quality']
  }

  push_log(log){
    this.playerLog.push(log);

  }

  save_log(filename){
    var csvtxt=this.playerLog.join(',\n');
    var uri='data:text/csv,' + encodeURIComponent(csvtxt);
    this.downloadDataUri(uri,filename);
  }

  save_log_download(){
    const filename="playerLog.csv";
    //if (!filename.match(/\.csv$/i)) { filename = filename + '.csv' };
    var csvtxt=this.playerLog.join(',\n');

    var uri='data:text/csv,' + encodeURIComponent(csvtxt);
    this.downloadDataUri(uri,filename);
  }

  downloadDataUri(uri,filename){
     var link = document.createElement('a');
     link.download = filename;
     link.href = uri;
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
  }
}

function add_log_scrollbar(text){
  var list = document.createElement("li");
  list.innerHTML=text;
  parentDiv.appendChild(list);
}
