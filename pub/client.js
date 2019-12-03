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
        //DrKow: I put in this line so you have an array to work with.  Having a function to generate this would be a little cleaner, but you can leave it hard-coded if you like.
        shipArray: [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]]
    },
    methods: {
        //DrKow: I put this function in so you have a way of mapping a number to an image, for the grid display.  You will need to decide what each number represents and what image it maps to.
        imageFor: function(squareValue) {
            if (squareValue == 0) {
                return "img/blank.png";
            }
            else if (squareValue == 1){
                return "img/hit.png";
            }
            else {
                return "img/miss.png";
            }
        },
        //DrKow: The purpose of this function is to take a pair of coordinates and modify the contents of that grid entry.  This is just some code to get you started.  In the final product, it should communicate the row/column to the server so that it can communicate back an updated array of hits/misses.
        shootSquare: function(r,c) {
          console.log("Shot square: " + r+" "+c);
          this.shipArray[r].splice(c,1,3); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
        },
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