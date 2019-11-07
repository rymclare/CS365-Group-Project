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
var maxTime;
var turn;
var message = "";
var player1 = "";
var player2 = "";
var remainP1Ships;
var remainP2Ships;

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

