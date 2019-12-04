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
        ship1: 0,
        ship2: 0,
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
        rotate1: false,
        rotate2: false,
        //DrKow: I put in this line so you have an array to work with.  Having a function to generate this would be a little cleaner, but you can leave it hard-coded if you like.
        shipArray1: [[0,0,0,1,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]],
        shipArray2: [[0,0,0,1,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]]
    },
    methods: {
        //DrKow: I put this function in so you have a way of mapping a number to an image, for the grid display.  You will need to decide what each number represents and what image it maps to.
        imageFor: function(squareValue) {
            if (squareValue == 0) {
                return "img/blank.png";
            }
            else if (squareValue == 1){
                return "img/ship.png";
            }
            else if (squareValue == 2){
                return "img/hit.png";
            }
            else {
                return "img/miss.png";
            }
        },
        rotateShip1: function() {
            this.rotate1 = !(this.rotate1);
        },
        rotateShip2: function() {
            this.rotate2 = !(this.rotate2);
        },
        resetShips1: function() {
            this.shipArray1 = [[0,0,0,1,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]];
            this.twoIP = false;
            this.twoINP = true;
            this.threeIP = false;
            this.threeINP = true;
            this.threeThreeIP = false;
            this.threeThreeINP = true;
            this.fourIP = false;
            this.fourINP = true;
            this.fiveIP = false;
            this.fiveINP = true;
        },
        resetShips2: function() {
            this.shipArray2 = [[0,0,0,1,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]];
            this.twoIP = false;
            this.twoINP = true;
            this.threeIP = false;
            this.threeINP = true;
            this.threeThreeIP = false;
            this.threeThreeINP = true;
            this.fourIP = false;
            this.fourINP = true;
            this.fiveIP = false;
            this.fiveINP = true;
        },
        //DrKow: The purpose of this function is to take a pair of coordinates and modify the contents of that grid entry.  This is just some code to get you started.  In the final product, it should communicate the row/column to the server so that it can communicate back an updated array of hits/misses.
        shootSquare1: function(r,c,squareValue) {
          console.log("Shot square: " + r+" "+c);
          if (squareValue == 0 && this.ship1 == 2){
            if (this.rotate1 == false){
                this.shipArray1[r].splice(c,1,1); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
                this.shipArray1[(r)].splice((c+1),1,1);
                this.twoIP = true;
                this.twoINP = false;
                this.ship1 = 0;
                console.log("ship = " + this.ship1);
            }
            else{
                this.shipArray1[r].splice(c,1,1); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
                this.shipArray1[(r+1)].splice((c),1,1);
                this.twoIP = true;
                this.twoINP = false;
                this.ship1 = 0;
                console.log("ship = " + this.ship2);
            }
        }
        },
        shootSquare2: function(r,c,squareValue) {
            console.log("Shot square: " + r+" "+c);
            if (squareValue == 0 && this.ship2 == 2){
                if (this.rotate == false){
                    this.shipArray2[r].splice(c,1,1); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
                    this.shipArray2[(r)].splice((c+1),1,1);
                    this.twoIP = true;
                    this.twoINP = false;
                    this.ship2 = 0;
                    console.log("ship = " + this.ship2);
                }
                else{
                    this.shipArray2[r].splice(c,1,1); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
                    this.shipArray2[(r+1)].splice((c),1,1);
                    this.twoIP = true;
                    this.twoINP = false;
                    this.ship2 = 0;
                    console.log("ship = " + this.ship2);
                }
            }
            else if (squareValue == 0 && this.ship2 == 3){
                this.shipArray2[r].splice(c,1,1); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
                this.shipArray2[(r)].splice((c+1),1,1);
                this.shipArray2[(r)].splice((c-1),1,1);
                this.threeIP = true;
                this.threeINP = false;
                this.ship2 = 0;
                console.log("ship = " + this.ship2);
            }
            else if (squareValue == 0 && this.ship2 == 33){
                this.shipArray2[r].splice(c,1,1); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
                this.shipArray2[(r)].splice((c+1),1,1);
                this.shipArray2[(r)].splice((c-1),1,1);
                this.threeThreeIP = true;
                this.threeThreeINP = false;
                this.ship2 = 0;
                console.log("ship = " + this.ship2);
            }
            else if (squareValue == 0 && this.ship2 == 4){
                this.shipArray2[r].splice(c,1,1); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
                this.shipArray2[(r)].splice((c+1),1,1);
                this.shipArray2[(r)].splice((c+2),1,1);
                this.shipArray2[(r)].splice((c-1),1,1);
                this.fourIP = true;
                this.fourINP = false;
                this.ship2 = 0;
                console.log("ship = " + this.ship2);
            }
            else if (squareValue == 0 && this.ship2 == 5){
                this.shipArray2[r].splice(c,1,1); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
                this.shipArray2[(r)].splice((c+1),1,1);
                this.shipArray2[(r)].splice((c+2),1,1);
                this.shipArray2[(r)].splice((c-1),1,1);
                this.shipArray2[(r)].splice((c-2),1,1);
                this.fiveIP = true;
                this.fiveINP = false;
                this.ship2 = 0;
                console.log("ship = " + this.ship2);
            }
            else if (squareValue == 1){
                this.shipArray2[r].splice(c,1,2); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
            }
            else if (squareValue == 0){
                this.shipArray2[r].splice(c,1,3); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
            }
        },
        selectShipTwo: function() {
            this.ship1 = 2;
            console.log("Ship two");
        },
        selectShipThree: function() {
            this.ship = 3;
            console.log("Ship three");
        },
        selectShipThreeThree: function() {
            this.ship = 33;
            console.log("Ship three three");
        },
        selectShipFour: function() {
            this.ship = 4;
            console.log("Ship four");
        },
        selectShipFive: function() {
            this.ship = 5;
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