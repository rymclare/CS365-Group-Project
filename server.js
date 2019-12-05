// The server side.

var express = require("express");
var app = express();
var http = require("http");
var server = http.Server(app);
var socketio = require("socket.io");
var io = socketio(server);
app.use(express.static("pub"));

var turn;               // 1 = "Player1's turn" 2 = "player2's turn" 
var message = "";
var p1Seat;             // Socket object.
var p2Seat;             // Socket object.
var isP1Ready;
var isP2Ready;
var board1 = [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]];
var board2 = [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]];
var gameMode;           // 0 = setup mode, 1 = game in play, 2 = game over.

// Return the game state.
function gameState() {
    var ret = {};
    ret.gameMode = gameMode;
    ret.message = message;
    ret.turn = turn;
    return ret;
}

// Send the game state.
function sendGameState() {
    if (p1Seat != null) p1Seat.emit("gameState", gameState());
	if (p2Seat != null) p2Seat.emit("gameState", gameState());
	io.in("spectator").emit("gameState", gameState());
}
// Change the square state and retutn the value of the square.
function changeSquareState(board, r, c) {
    if(board == 1) {
        if(board1[r][c] == 0)       // 0 means "empty".
            board1[r][c] == -1;     // -1 means "miss".
        if(board1[r][c] == 1)       // 1 means "occupied".
            board1[r][c] == 2;      // 2 means "hit".
        return board1[r][c];
    }
    else if(board == 2) {
        if(board2[r][c] == 0)       // 0 means "empty".
            board2[r][c] == -1;     // -1 means "miss".
        if(board2[r][c] == 1)       // 1 means "occupied".
            board2[r][c] == 2;      // 2 means "hit".
        return board2[r][c];
    }
}

// Check if a player won.
function checkWinner() {
    let p1Lose = true;
    let p2Lose = true;
    for(let i = 0; i < 10 ; i++)
        for(let j = 0; j < 10; j++) {
            if(board1[i][j] == 1) {
                p1Lose = false;
                break;
            }
            if(board2[i][j] == 1) {
                p2Lose = false;
                break;
            }
        }
    if(p1Lose)
        return 2;
    else if(p2Lose)
        return 1;
    else
        return 0;
}
// Reset.
function resetGame() {
	gameMode = 0;
	isP1Ready = false;
	isP2Ready = false;
	turn = 0;
	message = "The game is now reset."
}

// Communication with clients.
io.on("connection", function(socket) {
    // When someone connects, The person becomes a spectator.
	console.log("Somebody connected.");
    socket.join("spectator");
    sendGameState();
    
	socket.on("disconnect", function() {
        console.log("Somebody disconnected.");
        if(p1Seat == socket) {
            p1Seat = null;
        }
        else if(p2Seat == socket) {
            p2Seat = null;
        }
        else {
            socket.leave("spectator");
        }
        sendGameState();
    });

    socket.on("sitAsP1", function() {
		if (p1Seat == null) {
			p1Seat = socket;
			if (p2Seat == socket) { 
            	p2Seat = null;
			}
			else {
				socket.leave("spectator");
			}
		}
		sendGameState();
    });
    socket.on("sitAsP2", function() {
		if (p2Seat == null) {
			p2Seat = socket;
			if (p1Seat == socket) { 
            	p1Seat = null;
			}
			else {
				socket.leave("spectator");
			}
		}
		sendGameState();
    });
    socket.on("commitShips1", function(dfc) {
        if(!p1Seat) {
            board1 = dfc;
            isP1Ready = true;
            if(isP2Ready) {
                gameMode = 1;
                turn = 1;
                message = "Game in play";
            }
        }
    });
    socket.on("commitShips2", function() {
        if(!p2Seat) {
            board2 = dfc;
            isP2Ready = true;
            if(isP1Ready) {
                gameMode = 1;
                turn = 1;
                message = "Game in play";
            }
        }
    });
    socket.on("shoot1", function(coordinate) {
        io.emit("changeBoard1", {val: changeSquareState(1, dfc.r, dfc.c), coord: coordinate}); // changeSquareState returns the value of the square.
        if(checkWinner() != 0) {
            gameMode = 2;
            turn = 0;
            message = "Player" + checkWinner() + " Wins!";
        }
        turn = 1;
        sendGameState();
    });
    socket.on("shoot2", function(coordinate) {
        io.emit("changeBoard2", {val: changeSquareState(2, dfc.r, dfc.c), coord: coordinate});
        if(checkWinner() != 0) {
            gameMode = 2;
            turn = 0;
            message = "Player" + checkWinner() + " Wins!";
        }
        turn = 2;
        sendGameState();
    });
    socket.on("restart", function() {
        resetGame();
        sendGameState();
    })
});

server.listen(80, function() {
    console.log("Server with socket.io is ready at port 80.");
});