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
        message: "blank",
        a: "a",
        ship: 0,
        twoIP: false,
        twoINP: true,
        threeIP: false,
        threeINP: true,
        threeThreeIP: false,
        threeThreeINP: true,
        fourIP: false,
        fourINP: true,
        fiveIP: false,
        fiveINP: true,
    },
    methods: {
        click: function() {
            if (this.ship == 0){
                this.tip = true;
            }
        },
        selectShipTwo: function() {
            this.ship = 2;
            this.twoIP = true;
            this.twoINP = false;
            console.log("Ship two");
        },
        selectShipThree: function() {
            this.ship = 3;
            this.threeIP = true;
            this.threeINP = false;
            console.log("Ship three");
        },
        selectShipThreeThree: function() {
            this.ship = 33;
            this.threeThreeIP = true;
            this.threeThreeINP = false;
            console.log("Ship three three");
        },
        selectShipFour: function() {
            this.ship = 4;
            this.fourIP = true;
            this.fourINP = false;
            console.log("Ship four");
        },
        selectShipFive: function() {
            this.ship = 5;
            this.fiveIP = true;
            this.fiveINP = false;
            console.log("Ship five");
        },
    },
    computed: {
        twoIsPlaced: function(){
            if (this.twoIP == true){
                return true;
            }
            else {
                return false;
            }
        },
        twoIsNotPlaced: function(){
            if (this.twoINP == true){
                return true;
            }
            else {
                return false;
            }
        },
        threeIsPlaced: function(){
            if (this.threeIP == true){
                return true;
            }
            else {
                return false;
            }
        },
        threeIsNotPlaced: function(){
            if (this.threeINP == true){
                return true;
            }
            else {
                return false;
            }
        },
        threeThreeIsPlaced: function(){
            if (this.threeThreeIP == true){
                return true;
            }
            else {
                return false;
            }
        },
        threeThreeIsNotPlaced: function(){
            if (this.threeThreeINP == true){
                return true;
            }
            else {
                return false;
            }
        },
        fourIsPlaced: function(){
            if (this.fourIP == true){
                return true;
            }
            else {
                return false;
            }
        },
        fourIsNotPlaced: function(){
            if (this.fourINP == true){
                return true;
            }
            else {
                return false;
            }
        },
        fiveIsPlaced: function(){
            if (this.fiveIP == true){
                return true;
            }
            else {
                return false;
            }
        },
        fiveIsNotPlaced: function(){
            if (this.fiveINP == true){
                return true;
            }
            else {
                return false;
            }
        },
    },
});

/*socket.on("sendBack", function(dfs) {
    console.log("The server returned data.");
    vm.board = dfs.board;
    message = "";
});
*/