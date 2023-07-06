let gameBoard = {
    lastIndex: 0,
    playerMarker: '',
    timesInaRow: 0,
    gameboard: ['', '', '', '' ,'' ,'', '', '', ''],
    play: function (row, number) {
        if (this.emptyCheck(row, number) === true) {
            index = (row - 1) * 3 + (number - 1);
            this.lastIndex = index;
            this.gameboard[index] = this.playerMarker;
            document.getElementById(`${index + 1}`).style.backgroundColor = "black";
            this.left -= 1;
            this.winCheck();
            this.rowVictoryCheck();
        } else {
            console.log('The section is not empty');
        }
    },
    setPlayerMarker: function(choice) {
        this.playerMarker = choice;
    },
    left: 9,
    emptyCheck: function(row, number) {
        index = (row - 1) * 3 + (number - 1);
        if (this.gameboard[index] === '') {
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
            if (this.gameboard[this.lastIndex] === this.playerMarker) {
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

const Player = function (name, playerMarker) {
    this.name = playerName,
    this.playerMarker = playerMarker
}

let playerName;
let playerMarker;
const NAME = document.getElementById('player_1_name');
const MARKER = document.getElementById('player_1_marker');
const SUBMIT = document.getElementById('submit');


SUBMIT.addEventListener('click', (event) => {
    playerMarker = MARKER.textContent;
    playerName = NAME.textContent;
    event.preventDefault();
})