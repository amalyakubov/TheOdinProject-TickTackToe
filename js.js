let gameBoard = {
    playerMarker: '',
    gameboard: ['', '', '', '' ,'' ,'', '', '', ''],
    play: function (row, number) {
        index = (row - 1) * 3 + number - 1;
        this.gameboard[index] = this.playerMarker;
        document.getElementById(`${index + 1}`).style.backgroundColor = "black";
        this.winCheck();
    },
    setPlayerMarker: function(choice) {
        this.playerMarker = choice;
    },
    emptyCheck: function(row, number) {
        index = (row - 1) * 4 + number - 1;
        if (this.gameboard[index] !== 'X' && this.gameboard[index]) {
            return true;    
        } else {
            return false;
        }
    },
    winCheck: function() {
        if (this.rowVictoryCheck()) {
            if (this.playerWon) {
                console.log(`Player won!`);
            } else {
                console.log('Player lost!');
            }
        } else {
            console.log(`Tie`);
        }
    },
    playerWon: '',
    rowVictoryCheck: function() {
        let timesInaRow = 0;
        let victoryRow = [];
        this.gameboard.forEach((element) => {
            if (element === this.gameboard[this.gameboard.indexOf(element - 1)] && element !== '') {
                timesInaRow++;
                victoryRow.push(element);
            } else {
                timesInaRow = 0;
            }
        })
        if (timesInaRow === 3) {
            if (victoryRow[0] === this.playerMarker) {
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