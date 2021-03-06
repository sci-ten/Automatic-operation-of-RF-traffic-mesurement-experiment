# Automatic-operation-of-RF-traffic-mesurement-experiment
特定のアプリケーション(YouTube)を利用したときの無線トラフィックを収集する実験を自動化する.

## 目的
これまで手作業でやっていた実験操作を自動化することで、大量のデータを楽に取得する

## 実験操作

<div align="center">
  <img src= "https://user-images.githubusercontent.com/61642448/85200249-be41b200-b330-11ea-82f0-7f225458ed5d.jpg" title="システム構想" width=450>
</div>

- アプリケーションの操作（起動,再生等）をスケジュールに従って行う.
- RSA (Real-time Spectrum Analyzer)を用いた周波数観測をスケジュールに従って行う.
- 各種実験操作のタイムスタンプと内容を記録
- 収集したデータを整理

上記を自動的に行うシステムを作成する.

## システム構成
<br>
<div align="center">
  <img src="https://user-images.githubusercontent.com/61642448/85200313-4cb63380-b331-11ea-9638-8e4d9e4b3588.png" title="システム構成" ,width=500>
</div>

### 実装する機能
アプリケーション利用系・周波数利用観測系（共通）
- アプリケーション利用系と周波数利用観測系で時刻を同期するために, NTPサーバから正確な時刻を取得する
- 外部からデータベースとファイルサーバにアクセスするためにVPNを利用する

<br>
アプリケーション利用系

- YouTube iframe player を用いて, YouTubeのプレイヤーをHTMLに埋め込む
- スケジュールファイル(csv)に従って, 指定時刻, 指定条件で動画プレイヤーに対する操作を行う
-　操作内容,時刻のログをデータベースにアップロード,ブラウザに表示
<br>
周波数利用観測系

- GUIからスケジュールパス,保存先ディレクトリ,データベースログイン情報を入力させる 
- スケジュールファイル(csv)に従って, 指定時刻,　指定条件で観測操作を実行する
- 観測パラメータ, ファイル作成時刻等の観測関連情報をデータベースにアップロード
- 観測の進行状況をファイルサーバにアップロードする(csvファイルを追記していく)

<br>
実験管理

- スケジュールファイルをファイルサーバへアップロードする(手作業でやるのでプログラムは作成しない)
- データベースからデータを取得
- 信号処理


## プログラム管理
アプリケーション利用系<br>
...このリポジトリで管理

周波数利用観測系<br>
...https://github.com/sci-ten/RSA_IQ_Mesurement で管理

データ解析<br>
...プライベートリポジトリで管理


