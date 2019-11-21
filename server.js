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
    constructor(size, owner, direction) {
        this.size = size;
        this.owner = owner;
        this.isDead = false;
        this.direction = direction;
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
                board[i][j] == null;        
            }
        }
    }
}

// Fix the tray size.
function traySize(ranks , files) {
    for(i = 0; i < ranks; i++) {
        if(!tray[ranks]) {
            tray[ranks] = [];
            for(j = 0; j < files; j++) {
                tray[i][j] == null;        
            }
        }
    }
}

// Set the trays.
function fillTray(tray) {
    if(tray == p1Tray) {
        p1Ships = [new Ship(2, "p1"), new Ship(3, "p1"), new Ship(3, "p1"), new Ship(4, "p1"), new Ships(5, "p1")];
        for(var x = 0; x < tray.length; x++) {
            for(var y = 0; y < tray[x].length; y++) {
                tray[x][y] = p1Ships[x + y * tray.length];
            }
        }
    }
    else if(tray == p2tray) {
        p2Ships = [new Ship(2, "p2"), new Ship(3, "p2"), new Ship(3, "p2"), new Ship(4, "p2"), new Ships(5, "p2")];
        for(var x = 0; x < tray.length; x++) {
            for(var y = 0; y < tray[x].length; y++) {
                tray[x][y] = p2Ships[x + y * tray.length];
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
    socket.on("move", function(clicks) {
        if(clicks.firstClick.area == "p1Tray") {
            if(p1Tray[clicks.firstClick.row][clicks.firstClick.col]) {
                if(clicks.secondClick.area == "board") {
                    
                }
            }
        }
        else if(clicks.firstClick.area == "p2Tray") {
            if(p2Tray[clicks.firstClick.row][clicks.firstClick.col]) {

            }
        }
    })
});

server.listen(80, function() {
    console.log("Server with socket.io is ready at port 80.");
});