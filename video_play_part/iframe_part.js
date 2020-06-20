
// YouTubeの埋め込み
function onYouTubeIframeAPIReady() {
   ytplayer = new YT.Player(
       'ytplayer', // set video place
        {
          width: player_parameter.width,
          height: player_parameter.height,
          videoId: player_parameter.videoId,
          // set events
          events: {
               'onReady': onPlayerReady, // プレーヤーの準備ができたときに実行
               'onStateChange': onPlayerStateChange, // プレーヤーの状態が変更されたときに実行
               'onPlaybackQualityChange': onPlaybackQualityChange //プレイヤーの画質が変更されたときに実行
          },
          playerVars:{
            rel: 0
          }

       }
   )
}


//load playback schdule
const schdule = JSON.parse(localStorage.getItem('tmp'))
console.log("schdule data",schdule);

//grobal variable for iframe instance
var ytplayer;

//player parameter
const player_parameter={
  width: 640,
  height: 390,
  videoId: '0ioN_Xwap-g',
  quality: 'hd1080'
};

// load Iframe API
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
//insert player
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


//Data object for player state
var playerState;
var playerLog;


//insert player log
var pearent = document.getElementsByClassName('scrollbar_log')[0];
var parentDiv = document.createElement("ul");
parentDiv.id = "loglist";
parentDiv.className='loglist';
pearent.appendChild(parentDiv);
