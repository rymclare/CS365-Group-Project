// Yudai.
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
var turn;
var message = "";
var player1;            // Player name.
var player2;            // Player name.
var isp1Ready;
var isp2Ready;
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
function fixBoard(ranks, files) {
    for(i = 0; i < ranks; i++) {
        if(!board[ranks]) {
            board[ranks] = [];
            for(j = 0; j < files; j++) {
                board[i][j] = 0;
            }
        }
    }
}

// Reset.
function resetGame() {
	gameMode = 0;
	isp1Ready = false;
	isp2Ready = false;
	turn = "";
	message = "The game is now reset."
}

// Communication with clients.
io.on("connection", function(socket) {
	console.log("Somebody connected.");
	socket.emit("sendBack", board, message, isGameOver);
	socket.on("disconnect", function() {
		console.log("Somebody disconnected.");
    });
});

server.listen(80, function() {
    console.log("Server with socket.io is ready.");
});