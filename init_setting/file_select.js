function upload(event){

  if (!checkFileReader()) {
    alert("エラー：FileAPI非対応のブラウザです。");
  } else {
    var file = event.target.files[0];
  }

    var reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function(event) {
      var csvdata = event.target.result;
      //配列に格納
      data=makeDataList(csvdata);
      console.log("data",data)
      //データをテーブルを使って表示
      makeTable(data);
      //ローカルに一時ファイルとして保存
      localStorage.setItem('tmp', JSON.stringify(schdule_stack))
      //ページ遷移ボタンを作成
      makeTurnButton();
    }

    //読み込めなかった場合のエラー処理
    reader.onerror = function() {
      alert("エラー：ファイルをロードできません。");
    }
}


// ファイルアップロード判定
function checkFileReader() {
    var isUse = false;
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      isUse = true;
    }
    return isUse;
}

function makeDataList(csvdata) {
    var tmp=csvdata.split("\n");
    //一行づつ配列に追加
    var data = [];
    for (var i = 0; i < tmp.length; i++) {
      var row_data = tmp[i];
      data[i] = row_data.split(",");
      if (i !=0){
        //convert Unix timeout
        var timeStampStr=data[i][0]+"+09:00";
        //[msec]
        var unixTimeStamp=Date.parse(timeStampStr);
        console.log(unixTimeStamp/1000);
        const schdule={"run_time":unixTimeStamp/1000,"process":data[i][1]}
        schdule_stack.push(schdule);
      }
    }
    return data
}

function makeTable(data){

  var rows=[];
  var table = document.createElement("table");
  // 表に2次元配列の要素を格納
   for(i = 0; i < data.length; i++){
       rows.push(table.insertRow(-1));  // 行の追加
       for(j = 0; j < data[0].length; j++){
           cell=rows[i].insertCell(-1);
           cell.appendChild(document.createTextNode(data[i][j]));
           // 背景色の設定
           if(i==0){
               cell.style.backgroundColor = "#bbb"; // ヘッダ行
           }else{
               cell.style.backgroundColor = "#ddd"; // ヘッダ行以外
           }
       }
   }
   // 指定したdiv要素に表を加える
   document.getElementsByClassName("table")[0].appendChild(table);
}


function makeTurnButton(){
    const addButton = document.createElement('input');
    addButton.classList.add('addition');
    addButton.type = 'button';
    addButton.value = 'next';
    document.getElementsByClassName("next")[0].appendChild(addButton);

    // 要素にクリックイベントを追加する
    addButton.onclick = function() {
      location.href='./frame.html';
    };
}


var loadBtn = document.querySelector("#loadBtn");
loadBtn.addEventListener("change", upload, false);
const schdule_stack=new Array();
