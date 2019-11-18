// The server side.

var express = require("express");
var app = express();
var http = require("http");
var server = http.Server(app);
var socketio = require("socket.io");
var io = socketio(server);
app.use(express.static("pub"));

var board = [];
var time;
var turn;               // 1 = "Player1's turn" 2 = "player2's turn" 
var message = "";
var player1;            // Player1's name.
var player2;            // Player2's name.
var p1Seat;             // Socket object.
var p2Seat;             // Socket object.
var isP1Ready;
var isP2Ready;
var P1Tray = [];
var P2Tray = [];
var p1Ships = [];
var p2Ships = [];
var gameMode;           // 0 = setup mode, 1 = game in play, 2 = game over.

// This class has a ship's id and its size.
class Ship {
    constructor(id, size) {
        this.id = id;
        this.size = size;
        this.isDead = false;
    }
    getId() {
        return this.id;
    }
    getSize() {
        return this.size;
    }
    getIsDead() {
        return this.isDead;
    }
    kill() {
        this.isDead = true;
    }
}

// This class has a player's name and his record.
class Player {
    constructor(name, record) {
        this.name = name;
        this.record = record;
    }
    getName() {
        return this.name;
    }
    getRecord() {
        return this.record;
    }
}

// Fix the board size to be ranks * files.
function boardSize(ranks, files) {
    for(i = 0; i < ranks; i++) {
        if(!board[ranks]) {
            board[ranks] = [];
            for(j = 0; j < files; j++) {
                board[i][j];        
            }
        }
    }
}
// Return the game state.
function gameState() {
    var ret = {};
    ret.gameMode = gameMode;
    ret.player1 = player1;
    ret.player2 = player2;
    ret.p1Seat = (p1Seat != null);
    ret.p2Seat = (p2Seat != null);
    ret.isP1Ready = isP1Ready;
    ret.isP2Ready = isP2Ready;
    ret.turn = turn;
    ret.p1Ships = p1Ships;
    ret.p2Ships = p2Ships;

    return ret;
}

// Send the game state.
function sendGameState() {
    if (p1Seat != null) p1Seat.emit("gameState", gameState());
	if (p2Seat != null) p2Seat.emit("gameState", gameState());
	io.in("spectator").emit("gameState", getGameState());
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
    boardSize(10, 10);
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
    socket.on("trayClicked", function(tray, row, col) {
        if(tray == "p1Tray") {
            if(p1Tray[row][col]) {
                
            }
        }
        else if(tray == "p2Tray") {

        }
    })
});

server.listen(80, function() {
    console.log("Server with socket.io is ready at port 80.");
});