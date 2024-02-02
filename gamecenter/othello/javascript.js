class Cell {
    static Empty = ".";
    static Black = "●";
    static White = "○";
}

class OthelloBoard {
    constructor() {
        this.board = new Array(8).fill(null).map(() => new Array(8).fill(Cell.Empty));
        // Initial setup
        this.board[3][3] = Cell.White;
        this.board[3][4] = Cell.Black;
        this.board[4][3] = Cell.Black;
        this.board[4][4] = Cell.White;
    }

    displayBoard() {
        this.board.forEach(row => {
            console.log(row.join(" ") + "\n");
        });
    }

    isValidMove(x, y, player) {
        if (x < 0 || x >= 8 || y < 0 || y >= 8 || this.board[x][y] !== Cell.Empty) {
            return false;
        }

        let opponent = player === Cell.Black ? Cell.White : Cell.Black;
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;

                let newX = x + dx, newY = y + dy, hasOpponentBetween = false;
                while (newX >= 0 && newX < 8 && newY >= 0 && newY < 8 && this.board[newX][newY] === opponent) {
                    hasOpponentBetween = true;
                    newX += dx;
                    newY += dy;
                }

                if (hasOpponentBetween && newX >= 0 && newX < 8 && newY >= 0 && newY < 8 && this.board[newX][newY] === player) {
                    return true;
                }
            }
        }

        return false;
    }

    placeStone(x, y, player) {
        if (this.isValidMove(x, y, player)) {
            this.board[x][y] = player;
            this.flipStones(x, y, player);
        }
    }

    flipStones(x, y, player) {
        let opponent = player === Cell.Black ? Cell.White : Cell.Black;
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;

                let newX = x + dx, newY = y + dy, hasOpponentBetween = false;
                while (newX >= 0 && newX < 8 && newY >= 0 && newY < 8 && this.board[newX][newY] === opponent) {
                    hasOpponentBetween = true;
                    newX += dx;
                    newY += dy;
                }

                if (hasOpponentBetween && newX >= 0 && newX < 8 && newY >= 0 && newY < 8 && this.board[newX][newY] === player) {
                    let flipX = x + dx, flipY = y + dy;
                    while (flipX !== newX || flipY !== newY) {
                        this.board[flipX][flipY] = player;
                        flipX += dx;
                        flipY += dy;
                    }
                }
            }
        }
    }
    drawBoard() {
        const boardElement = document.getElementById('board');
        boardElement.innerHTML = ''; // 盤面をクリア

        for (let i = 0; i < 8; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < 8; j++) {
                const cell = document.createElement('td');
                cell.textContent = this.board[i][j];
                cell.addEventListener('click', () => this.handleCellClick(i, j));
                row.appendChild(cell);
            }
            boardElement.appendChild(row);
        }
    }

    handleCellClick(x, y) {
        if (this.isValidMove(x, y, this.currentPlayer)) {
            this.placeStone(x, y, this.currentPlayer);
            this.drawBoard(); // 盤面を再描画
            this.switchPlayer(); // プレイヤーを切り替え
        } else {
            alert("Invalid move. Try again.");
        }
    }

    // プレイヤーを切り替える
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === Cell.Black ? Cell.White : Cell.Black;
        document.getElementById('currentPlayer').textContent = `現在のプレイヤー: ${this.currentPlayer === Cell.Black ? "黒" : "白"}`;
    }

    // クラス初期化時に現在のプレイヤーを追加
    constructor() {
        // 既存の初期化処理...
        this.currentPlayer = Cell.White; // 初期プレイヤーを設定
    }
}

// ゲーム開始時に盤面を描画
document.addEventListener('DOMContentLoaded', () => {
    const game = new OthelloBoard();
    game.drawBoard();
});

// ゲームのロジックを操作する部分
function playOthello() {
    const board = new OthelloBoard();
    let currentPlayer = Cell.White; // 初期プレイヤーを設定

    for (let turn = 0; turn < 60; ++turn) {
        board.displayBoard();
        console.log("Current Player: " + (currentPlayer === Cell.Black ? "Black" : "White"));

        let validMove = false;
        while (!validMove) {
            let input = prompt("Enter coordinates (row col): ");
            let [x, y] = input.split(' ').map(n => parseInt(n, 10) - 1);
            if (board.isValidMove(x, y, currentPlayer)) {
                validMove = true;
                board.placeStone(x, y, currentPlayer);
            } else {
                alert("Invalid move. Try again.");
            }
        }

        // プレイヤーを交代
        currentPlayer = currentPlayer === Cell.Black ? Cell.White : Cell.Black;
    }

    // 勝者を判定し、最終結果を表示するロジックが必要です
}

playOthello();
