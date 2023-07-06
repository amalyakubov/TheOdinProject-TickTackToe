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
            //index = (row - 1) * 3 + (number - 1);
            this.lastIndex = tilenumber;
            this.gameboard[tilenumber] = player.playerMarker;
            document.getElementById(`${tilenumber + 1}`).style.backgroundColor = "black";
            this.left -= 1;
            this.winCheck();
            this.rowVictoryCheck();
        } else {
            console.log('The section is not empty');
        }
    },
    left: 9,
    emptyCheck: function(tilenumber) {
        // index = (row - 1) * 3 + (number - 1);
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
                console.log(`Player won!`);
            } else {
                console.log('Player lost!');
            }
        } else if(this.left === 9) {
            console.log(`Tie`);
        }
    },
    playerWon: null,
    victoryRow: [],
    rowVictoryCheck: function() {
        if (this.gameboard[this.lastIndex] === this.gameboard[this.lastIndex - 1] && this.gameboard[this.lastIndex] === this.gameboard[this.lastIndex -2] && this.gameboard[this.lastIndex] !== '') {
            if (this.gameboard[this.lastIndex] === player.playerMarker) {
                this.playerWon = true;
            } else {
                this.playerWon = false;
            }
            return true;
        } else {
            return false;
        }
    },

}