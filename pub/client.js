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
        /*board: [],
        time:,
        turn:,
        message: "",
        player1:,
        player2:,
        P1Ships: [],
        P2Ships: [],
        isGameOver*/
    },
    methods: {

    },
    computed: {

    }
});