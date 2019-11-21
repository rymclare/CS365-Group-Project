// The client side.

/*var socket = io();
socket.on("sendBack", function(dfs) {
    console.log("The server returned data");
    vm.board = dfs.board;
    message = ""
});*/

var vm = new Vue ({
    el: "#app",
    data: {
        rows: [
            { num: 'zero' },
            { num: 'one' },
            { num: 'two' },
            { num: 'three' },
            { num: 'four' },
            { num: 'five' },
            { num: 'six' },
            { num: 'seven' },
            { num: 'eight' },
            { num: 'nine' },
            { num: 'ten' }
          ],
        board = [],
        time,
        turn,
        time,
        message: "",
        player1,            // Player1's name.
        player2,            // Player2's name.
        P1Tray: [],
        P2Tray: [],            
        p1Ships: [],
        p2Ships: [],
        gameMode: 0,
        firstClick 
    },
    methods: {
        p1TrayClicked: function(row, col) {
            socket.emit("trayClicked", tray, row, col, function(dfs) {
                console.log("The server returned data for update().");
                update(dfs);
            })
        },
        update: function(data) {
            this.board = data.board;
            this.turn = data.turn;
            this.time = data.time;
            this.message = data.message;
            this.player1 = data.player1;
            this.player2 = data.player2;
            this.p1Tray = data.p1Tray;
            this.p2Tray = data.p2Tray;
            this.p1Ships = data.p1Ships;
            this.p2Ships = data.p2Ships;
            this.gameMode = data.gameMode;
        },
        click: function(area, x, y, isMouseDownHandler) {
            if (firstClick == null && isMouseDownHandler) {
                firstClick = {area: area, x: x, y: y};
            }
            else if (firstClick != null && !(x == firstClick.x && y == firstClick.y)) {
                var secondClick = {area: area, x: x, y: y};
                var clicks = {firstClick: firstClick, secondClick: secondClick};
                socket.emit("move", clicks);
                firstClick = null;
            }
        }
    },
    computed: {

    }
})

socket.on("sendBack", function(dfs) {
    console.log("The server returned data.");
    vm.board = dfs.board;
    message = "";
});
