// ドキュメントが完全に読み込まれた後に関数を実行
document.addEventListener('DOMContentLoaded', function() {
    // ボタン要素を取得
    var blueButton = document.getElementById('blueButton');
    var redButton = document.getElementById('redButton');
    var yellowButton = document.getElementById('yellowButton');

    // 青いボタンがクリックされた時のイベント
    blueButton.addEventListener('click', function() {
        window.location.href = './gamecenter/index.html';
    });

    // 赤いボタンがクリックされた時のイベント
    redButton.addEventListener('click', function() {
        window.location.href = './anotherPage.html'; // 別の遷移先
    });

    // 黄色いボタンがクリックされた時のイベント
    yellowButton.addEventListener('click', function() {
        window.location.href = './thirdPage.html'; // さらに別の遷移先
    });
});
