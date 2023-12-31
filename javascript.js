// 派手な音ファイルのパスを指定
var audio = new Audio('./Cyber15-mp3/Cyber15-1.mp3');

// すべてのボタンにイベントリスナーを追加
document.querySelectorAll('.button').forEach(function(button) {
  button.addEventListener('click', function() {
    audio.play(); // ボタンがクリックされた時に音を再生
  });
});
