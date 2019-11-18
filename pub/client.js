// The client side.

var socket = io();

var vm = new Vue({
    el: "#app",
    data: {
        board: [],
        turn,
        time,
        message: "",
        player1,            // Player1's name.
        player2,
        P1Tray: [],
        P2Tray: [],            // Player2's name.
        p1Ships: [],
        p2Ships: [],
        gameMode: 0 
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
