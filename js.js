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
    RESTART: document.getElementById('restart'),
}

let Player2 = {
    playerName: null,
    playerMarker: null,
    NAME: document.getElementById('player_2_name'),
    SUBMIT: document.getElementById('submit-2')
}

Player2.SUBMIT.addEventListener('click', (event) => {
    Player2.playerName = Player2.NAME.value;
    event.preventDefault();
})

player.SUBMIT.addEventListener('click', (event) => {
    event.preventDefault();
    player.playerMarker = player.MARKER.value;
    gameBoard.playerMarker = player.MARKER.value;
    playerName = player.NAME.value;
    player1 = new Player(player.playerName, player.playerMarker);
    document.getElementById('player-form').style.display = 'none';
    document.getElementById('submit').style.display = 'none';
    document.getElementById('player-2-form').style.display = 'flex';
    document.getElementById('player-space').style.height = '150px';
    if (player.playerMarker === 'X') {
        Player2.playerMarker = 'O';
    } else {
        Player2.playerMarker = 'X';
    }
})

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
    playerMarker: null,
    play: function (tilenumber) {
        if (this.emptyCheck(tilenumber) === true) {
            this.lastIndex = tilenumber;
            this.gameboard[tilenumber] = this.playerMarker;
            document.getElementById(`${tilenumber + 1}`).innerHTML = this.playerMarker;
            this.left -= 1;
            this.winCheck();
            this.rowVictoryCheck();
            if (this.playerMarker === player.playerMarker) {
                this.playerMarker = Player2.playerMarker;
            } else {
                this.playerMarker = player.playerMarker;
            }
        } else {
            console.log('The section is not empty');
        }
    },
    left: 9,
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
            if (this.playerOneWon) {
                this.messageElement.textContent = `${player.playerMarker} has won!`;
                this.messageElement.style.color = 'green';
            } else {
                this.messageElement.textContent = `${Player2.playerName} has won!`;
                this.messageElement.style.color = 'green';
            }
        } else if(this.left === 0) {
            this.messageElement.textContent = 'It\'s a tie';
            this.messageElement.style.color = 'black';
        }
    },
    playerOneWon: null,
    messageElement: document.getElementById('message-space'),
    rowCheck: function() {
        if (this.gameboard[0] === this.playerMarker && this.gameboard[1] === this.playerMarker && this.gameboard[2] === this.playerMarker || this.gameboard[3] === this.playerMarker && this.gameboard[4] === this.playerMarker && this.gameboard[5] === this.playerMarker ||
        this.gameboard[6] === this.playerMarker && this.gameboard[7] === this.playerMarker && this.gameboard[8] === this.playerMarker || this.gameboard[0] === this.playerMarker && this.gameboard[3] === this.playerMarker && this.gameboard[6] === this.playerMarker || this.gameboard[1] === this.playerMarker && this.gameboard[4] === this.playerMarker && this.gameboard[7] === this.playerMarker || this.gameboard[2] === this.playerMarker && this.gameboard[5] === this.playerMarker && this.gameboard[8] === this.playerMarker) {
            return true;
        } else {
            return false;
        }
    },
    rowVictoryCheck: function() {
        if (this.rowCheck() === true) {
            if (this.gameboard[this.lastIndex] === player1.playerMarker) {
                this.playerOneWon = true;
            } else {
                this.playerOneWon = false;
            }
            return true;
        } else {
            return false;
        }
    },
    restartGame: function () {
        this.gameboard = ['', '', '', '' ,'' ,'', '', '', ''];
        this.lastIndex = 0;
        this.timesInaRow = 0;
        this.playerWon = null;
        this.left = 9;
        this.playerMarker = null;
        player.player1 = null;
        player.playerName = null;
        player.playerMarker = null;
        Player2.playerMarker = null;
        Player2.playerName = null;
        Array.from(tiles).forEach((tile) => {
            tile.innerHTML = '';
        });
        this.messageElement.textContent = '';
        document.getElementById('player-form').style.display = 'block';
        document.getElementById('submit').style.display = 'block';
        document.getElementById('player-2-form').style.display = 'none';
        document.getElementById('player-space').style.height = '200px';
    }
}

player.RESTART.addEventListener('click', () => {
    gameBoard.restartGame();
})