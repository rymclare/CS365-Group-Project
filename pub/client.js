// The client side.

var socket = io();
socket.on("sendBack", function(dfs) {
    console.log("The server returned data");
    vm.board = dfs.board;
    message = ""
});

var vm = new Vue ({
    el: "app",
    data: {
        board = [],
        time,
        turn,
        message = "",
        player1,
        player2,
        P1Ships = [],
        P2Ships = [],
        isGameOver
    },
    methods: {

    },
    computed: {

    }
});