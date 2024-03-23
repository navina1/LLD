
/******
1. Game Board:
    Properties:
        Size: The number of cells on the board.
        Snakes: Positions where the snakes start and end.
        Ladders: Positions where the ladders start and end.
2. Player:
    Properties:
        Name: Player's name.
        Position: Current position on the board.
    Methods:
        Move: Move the player based on the dice roll.
3. Dice:
    Properties:
        Sides: Number of sides on the dice (usually 6).
4. Game Engine:
    Properties:
        Players: List of players in the game.
        Board: Instance of the game board.
        CurrentPlayer: Player whose turn it is.
    Methods:
        RollDice: Simulate rolling the dice.
        MovePlayer: Move the current player based on the dice roll.
        CheckForSnakesAndLadders: Check if the player landed on a snake or ladder.
        CheckForWin: Check if any player has won the game.
        NextTurn: Move to the next player's turn.
****/

class Player {
    constructor(name) {
        this.name = name;
        this.position = 0;
    }
    move(steps) {
        this.position += steps;
    }
}


class Snake {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    getStart() {
        return start
    }
    getEnd() {
        return end
    }
}
class Ladder {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    getStart() {
        return start
    }
    getEnd() {
        return end
    }
}

class SnakeAndLadderBoard {
    constructor(size) {
        this.size = size;
        this.snakes = [];
        this.ladders = [];
        this.playerPieces = new Map();
    }
    getSize() {
        return this.size;
    }

    getSnakes() {
        return this.snakes;
    }

    setSnakes(snakes) {
        this.snakes = snakes;
    }

    getLadders() {
        return this.ladders;
    }

    setLadders(ladders) {
        this.ladders = ladders;
    }

    getPlayerPieces() {
        return this.playerPieces;
    }

    setPlayerPieces(playerPieces) {
        this.playerPieces = playerPieces;
    }
}

//Services
class DiceService {
    roll() {
        return Math.floor(Math.random() * this.sides) + 1;
    }
}

class SnakeAndLadderService {
    constructor(boardSize = 100) {
        this.snakeAndLadderBoard = new SnakeAndLadderBoard(boardSize);
        this.players = [];
        //this.isGameCompleted = false;
        this.noOfDices = 1; // Default number of dices
    }
    /*
        initializes the players of the game, assigns their initial positions, 
        and updates the game board with this information. 
    */
    setPlayers(players) {
        this.players = players;
        this.initialNumberOfPlayers = players.length;
        const playerPieces = new Map();
        players.forEach(player => {
            this.players.push(player);
            playerPieces.set(player.id, 0); // Each player has a piece which is initially kept outside the board (i.e., at position 0).
        });
        this.snakeAndLadderBoard.setPlayerPieces(playerPieces);
    }
    setSnakes(snakes) {
        this.snakeAndLadderBoard.setSnakes(snakes);
    }

    setLadders(ladders) {
        this.snakeAndLadderBoard.setLadders(ladders);
    }
    getNewPositionAfterGoingThroughSnakesAndLadders(newPosition) {
        let previousPosition;

        do {
            previousPosition = newPosition;
            for (const snake of this.snakeAndLadderBoard.getSnakes()) {
                if (snake.start === newPosition) {
                    newPosition = snake.end; // Whenever a piece ends up at a position with the head of the snake, the piece should go down to the position of the tail of that snake.
                }
            }

            for (const ladder of this.snakeAndLadderBoard.getLadders()) {
                if (ladder.start === newPosition) {
                    newPosition = ladder.end; // Whenever a piece ends up at a position with the start of the ladder, the piece should go up to the position of the end of that ladder.
                }
            }
        } while (newPosition !== previousPosition); // There could be another snake/ladder at the tail of the snake or the end position of the ladder and the piece should go up/down accordingly.
        return newPosition;
    }
    movePlayer(player, positions) {
        const oldPosition = this.snakeAndLadderBoard.getPlayerPieces().get(player.id);
        let newPosition = oldPosition + positions; // Based on the dice value, the player moves their piece forward that number of cells.

        const boardSize = this.snakeAndLadderBoard.getSize();

        if (newPosition > boardSize) {
            newPosition = oldPosition; // After the dice roll, if a piece is supposed to move outside position 100, it does not move.
        } else {
            newPosition = this.getNewPositionAfterGoingThroughSnakesAndLadders(newPosition);
        }

        this.snakeAndLadderBoard.getPlayerPieces().set(player.id, newPosition);

        console.log(`${player.name} rolled a ${positions} and moved from ${oldPosition} to ${newPosition}`);
    }
    hasPlayerWon(player) {
        const playerPosition = this.snakeAndLadderBoard.getPlayerPieces().get(player.id);
        const winningPosition = this.snakeAndLadderBoard.getSize();
        return playerPosition === winningPosition; // A player wins if it exactly reaches the position 100 and the game ends there.
    }

    isGameCompleted() {
        return this.players.length < this.initialNumberOfPlayers;
    }
    startGame() {
        while (!this.isGameCompleted()) {
            const totalDiceValue = this.getTotalValueAfterDiceRolls(); // Each player rolls the dice when their turn comes.
            const currentPlayer = this.players.shift();
            this.movePlayer(currentPlayer, totalDiceValue);
            if (this.hasPlayerWon(currentPlayer)) {
                console.log(`${currentPlayer.name} wins the game`);
                this.snakeAndLadderBoard.getPlayerPieces().delete(currentPlayer.id);
            } else {
                this.players.push(currentPlayer);
            }
        }
    }
    
    getTotalValueAfterDiceRolls() {
        // Logic to get total value after rolling dices
        return Math.floor(Math.random() * (6 * this.noOfDices - this.noOfDices + 1) + this.noOfDices);
    }
}
// Create instances of players
const player1 = new Player("Alice");
const player2 = new Player("Bob");

// Create instances of snakes
const snake1 = new Snake(17, 7);
const snake2 = new Snake(54, 34);
const snake3 = new Snake(62, 19);
const snake4 = new Snake(64, 60);
const snake5 = new Snake(87, 24);
const snake6 = new Snake(93, 73);
const snake7 = new Snake(95, 75);
const snake8 = new Snake(98, 79);

// Create instances of ladders
const ladder1 = new Ladder(4, 14);
const ladder2 = new Ladder(9, 31);
const ladder3 = new Ladder(20, 38);
const ladder4 = new Ladder(28, 84);
const ladder5 = new Ladder(40, 59);
const ladder6 = new Ladder(51, 67);
const ladder7 = new Ladder(63, 81);
const ladder8 = new Ladder(71, 91);

// Create an instance of the game board
const boardSize = 100;
const snakeAndLadderBoard = new SnakeAndLadderBoard(boardSize);

// Set snakes and ladders on the board
snakeAndLadderBoard.setSnakes([snake1, snake2, snake3, snake4, snake5, snake6, snake7, snake8]);
snakeAndLadderBoard.setLadders([ladder1, ladder2, ladder3, ladder4, ladder5, ladder6, ladder7, ladder8]);

// Create an instance of the game service
const snakeAndLadderService = new SnakeAndLadderService(boardSize);

// Set players and start the game
snakeAndLadderService.setPlayers([player1, player2]);
snakeAndLadderService.startGame();
