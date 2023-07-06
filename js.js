const Player = function (playerName, playerMarker) {
    this.name = playerName,
    this.playerMarker = playerMarker
}

let player =  {
    player1: null,
    playerName: null,
    playerMarker: null,
    NAME: document.getElementById('player_1_name'),
    MARKER: document.getElementById('player_1_marker'),
    SUBMIT: document.getElementById('submit'),
}

player.SUBMIT.addEventListener('click', (event) => {
    playerMarker = player.MARKER.value;
    playerName = player.NAME.value;
    player1 = new Player(playerName, playerMarker);
    event.preventDefault();
});

let tiles = document.getElementsByClassName('game-tile');
Array.from(tiles).forEach((tile) => {
    tile.addEventListener('click', () => {
        let tilenumber = Number(tile.id) - 1;
        console.log(tilenumber);
        gameBoard.play(tilenumber);
    })
})

let gameBoard = {
    lastIndex: 0,
    timesInaRow: 0,
    gameboard: ['', '', '', '' ,'' ,'', '', '', ''],
    play: function (tilenumber) {
        if (this.emptyCheck(tilenumber) === true) {
            this.lastIndex = tilenumber;
            this.gameboard[tilenumber] = player1.playerMarker;
            document.getElementById(`${tilenumber + 1}`).innerHTML = player1.playerMarker;
            this.left -= 1;
            this.winCheck();
            this.rowVictoryCheck();
        } else {
            console.log('The section is not empty');
        }
    },
    left: 9,
    rows: [[0, 1, 2], [3, 4, 5], [6, 7, 8]],
    emptyCheck: function(tilenumber) {
        if (this.gameboard[tilenumber] === '') {
            return true; 
        } else {
            return false;
        }
    },
    winCheck: function() {
        this.rowVictoryCheck();
        if (this.rowVictoryCheck()) {
            if (this.playerWon) {
                this.messageElement.textContent = 'Congratulations! You have won!';
                this.messageElement.style.color = 'green';
            } else {
                this.messageElement.textContent = 'You have lost!';
                this.messageElement.style.color = 'red';
            }
        } else if(this.left === 0) {
            this.messageElement.textContent = 'It\'s a tie';
            this.messageElement.style.color = 'black';
        }
    },
    playerWon: null,
    messageElement: document.getElementById('message-space'),
    rowCheck: function() {
        if (this.gameboard[0] === player1.playerMarker && this.gameboard[1] === player1.playerMarker && this.gameboard[2] === player1.playerMarker || this.gameboard[3] === player1.playerMarker && this.gameboard[4] === player1.playerMarker && this.gameboard[5] === player1.playerMarker ||
        this.gameboard[6] === player1.playerMarker && this.gameboard[7] === player1.playerMarker && this.gameboard[8] === player1.playerMarker) {
            return true;
        } else {
            return false;
        }
    },
    rowVictoryCheck: function() {
        if (this.rowCheck() === true) {
            if (this.gameboard[this.lastIndex] === player1.playerMarker) {
                this.playerWon = true;
            } else {
                this.playerWon = false;
            }
            return true;
        } else {
            return false;
        }
    }
}