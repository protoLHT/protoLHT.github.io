// 音ファイルのパスを指定
var audio = new Audio('click-sound.mp3');

// ボタンにイベントリスナーを追加
document.getElementById('myButton').addEventListener('click', function() {
  audio.play(); // ボタンがクリックされた時に音を再生
});
// 派手な音ファイルのパスを指定
var audio = new Audio('fancy-sound.mp3');

// すべてのボタンにイベントリスナーを追加
document.querySelectorAll('.button').forEach(function(button) {
  button.addEventListener('click', function() {
    audio.play(); // ボタンがクリックされた時に音を再生
  });
});
