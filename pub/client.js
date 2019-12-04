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
        rotate1: false,
        rotate2: false,
        shipArray1: [[2],[3],[33],[4],[5]],
        shipArray2: [[2],[3],[33],[4],[5]],
        //DrKow: I put in this line so you have an array to work with.  Having a function to generate this would be a little cleaner, but you can leave it hard-coded if you like.
        boardArray1: [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]],
        boardArray2: [[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]]
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
        imageForShips: function(squareValue) {
            if (squareValue == 2) {
                return "img/ship2.png";
            }
            else if (squareValue == 3){
                return "img/ship3.png";
            }
            else if (squareValue == 33){
                return "img/ship33.png";
            }
            else if (squareValue == 4){
                return "img/ship4.png";
            }
            else if (squareValue == 5){
                return "img/ship5.png";
            }
            else {
                return "img/blankShip.png";
            }
        },
        rotateShip1: function() {
            this.rotate1 = !(this.rotate1);
        },
        rotateShip2: function() {
            this.rotate2 = !(this.rotate2);
        },
        resetShips1: function() {
            this.boardArray1 = [[0,0,0,1,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]];
            this.shipArray1 = [[2],[3],[33],[4],[5]];
            this.rotate1 = false;
        },
        resetShips2: function() {
            this.boardArray2 = [[0,0,0,1,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]];
            this.shipArray2 = [[2],[3],[33],[4],[5]];
            this.rotate2 = false;
        },
        //DrKow: The purpose of this function is to take a pair of coordinates and modify the contents of that grid entry.  This is just some code to get you started.  In the final product, it should communicate the row/column to the server so that it can communicate back an updated array of hits/misses.
        shootSquare1: function(r,c,squareValue) {
            console.log("Shot square: " + r+" "+c);
            if (squareValue == 0 && this.ship1 == 2){
                if (this.rotate1 == false){
                    this.boardArray1[r].splice(c,1,1); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
                    this.boardArray1[(r)].splice((c+1),1,1);
                    this.ship1 = 0;
                    this.shipArray1[0].splice(0);
                    console.log("ship = " + this.ship2);
                }
                else{
                    this.boardArray1[r].splice(c,1,1); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
                    this.boardArray1[(r+1)].splice((c),1,1);
                    this.ship1 = 0;
                    this.shipArray1[0].splice(0);
                    console.log("ship = " + this.ship2);
                }
            }
            else if (squareValue == 0 && this.ship1 == 3){
                if (this.rotate1 == false){
                    this.boardArray1[r].splice(c,1,1); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
                    this.boardArray1[(r)].splice((c+1),1,1);
                    this.boardArray1[(r)].splice((c-1),1,1);
                    this.ship1 = 0;
                    this.shipArray1[1].splice(0);
                    console.log("ship = " + this.ship2);
                }
                else{
                    this.boardArray1[r].splice(c,1,1); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
                    this.boardArray1[(r+1)].splice((c),1,1);
                    this.boardArray1[(r-1)].splice((c),1,1);
                    this.ship1 = 0;
                    this.shipArray1[1].splice(0);
                    console.log("ship = " + this.ship2);
                }
            }
            else if (squareValue == 0 && this.ship1 == 33){
               if (this.rotate1 == false){
                    this.boardArray1[r].splice(c,1,1); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
                    this.boardArray1[(r)].splice((c+1),1,1);
                    this.boardArray1[(r)].splice((c-1),1,1);
                    this.ship1 = 0;
                    this.shipArray1[2].splice(0);
                    console.log("ship = " + this.ship2);
               }
               else{
                    this.boardArray1[r].splice(c,1,1); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
                    this.boardArray1[(r+1)].splice((c),1,1);
                    this.boardArray1[(r-1)].splice((c),1,1);
                    this.ship1 = 0;
                    this.shipArray1[2].splice(0);
                    console.log("ship = " + this.ship2);
               }
            }
            else if (squareValue == 0 && this.ship1 == 4){
               if(this.rotate1 == false){
                    this.boardArray1[r].splice(c,1,1); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
                    this.boardArray1[(r)].splice((c+1),1,1);
                    this.boardArray1[(r)].splice((c+2),1,1);
                    this.boardArray1[(r)].splice((c-1),1,1);
                    this.ship1 = 0;
                    this.shipArray1[3].splice(0);
                    console.log("ship = " + this.ship2);
               }
               else{
                    this.boardArray1[r].splice(c,1,1); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
                    this.boardArray1[(r+1)].splice((c),1,1);
                    this.boardArray1[(r+2)].splice((c),1,1);
                    this.boardArray1[(r-1)].splice((c),1,1);
                    this.ship1 = 0;
                    this.shipArray1[3].splice(0);
                    console.log("ship = " + this.ship2);
               }
            }
            else if (squareValue == 0 && this.ship1 == 5){
                if(this.rotate1 == false){
                    this.boardArray1[r].splice(c,1,1); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
                    this.boardArray1[(r)].splice((c+1),1,1);
                    this.boardArray1[(r)].splice((c+2),1,1);
                    this.boardArray1[(r)].splice((c-1),1,1);
                    this.boardArray1[(r)].splice((c-2),1,1);
                    this.ship1 = 0;
                    this.shipArray1[4].splice(0);
                    console.log("ship = " + this.ship2);
                }
                else{
                    this.boardArray1[r].splice(c,1,1); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
                    this.boardArray1[(r+1)].splice((c),1,1);
                    this.boardArray1[(r+2)].splice((c),1,1);
                    this.boardArray1[(r-1)].splice((c),1,1);
                    this.boardArray1[(r-1)].splice((c),1,1);
                    this.ship1 = 0;
                    this.shipArray1[4].splice(0);
                    console.log("ship = " + this.ship2);
                }
            }
            else if (squareValue == 1){
                this.boardArray1[r].splice(c,1,2); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
            }
            else if (squareValue == 0){
                this.boardArray1[r].splice(c,1,3); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
            }
        },
        shootSquare2: function(r,c,squareValue) {
            console.log("Shot square: " + r+" "+c);
            if (squareValue == 0 && this.ship2 == 2){
                if (this.rotate2 == false){
                    this.boardArray2[r].splice(c,1,1); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
                    this.boardArray2[(r)].splice((c+1),1,1);
                    this.twoIP = true;
                    this.twoINP = false;
                    this.ship2 = 0;
                    this.shipArray2[0].splice(0);
                    console.log("ship = " + this.ship2);
                }
                else{
                    this.boardArray2[r].splice(c,1,1); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
                    this.boardArray2[(r+1)].splice((c),1,1);
                    this.ship2 = 0;
                    this.shipArray2[0].splice(0);
                    console.log("ship = " + this.ship2);
                }
            }
            else if (squareValue == 0 && this.ship2 == 3){
                if (this.rotate2 == false){
                    this.boardArray2[r].splice(c,1,1); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
                    this.boardArray2[(r)].splice((c+1),1,1);
                    this.boardArray2[(r)].splice((c-1),1,1);
                    this.ship2 = 0;
                    this.shipArray2[1].splice(0);
                    console.log("ship = " + this.ship2);
                }
                else{
                    this.boardArray2[r].splice(c,1,1); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
                    this.boardArray2[(r+1)].splice((c),1,1);
                    this.boardArray2[(r-1)].splice((c),1,1);
                    this.ship2 = 0;
                    this.shipArray2[1].splice(0);
                    console.log("ship = " + this.ship2);
                }
            }
            else if (squareValue == 0 && this.ship2 == 33){
               if (this.rotate2 == false){
                    this.boardArray2[r].splice(c,1,1); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
                    this.boardArray2[(r)].splice((c+1),1,1);
                    this.boardArray2[(r)].splice((c-1),1,1);
                    this.ship2 = 0;
                    this.shipArray2[2].splice(0);
                    console.log("ship = " + this.ship2);
               }
               else{
                    this.boardArray2[r].splice(c,1,1); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
                    this.boardArray2[(r+1)].splice((c),1,1);
                    this.boardArray2[(r-1)].splice((c),1,1);
                    this.ship2 = 0;
                    this.shipArray2[2].splice(0);
                    console.log("ship = " + this.ship2);
               }
            }
            else if (squareValue == 0 && this.ship2 == 4){
               if(this.rotate2 == false){
                    this.boardArray2[r].splice(c,1,1); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
                    this.boardArray2[(r)].splice((c+1),1,1);
                    this.boardArray2[(r)].splice((c+2),1,1);
                    this.boardArray2[(r)].splice((c-1),1,1);
                    this.ship2 = 0;
                    this.shipArray2[3].splice(0);
                    console.log("ship = " + this.ship2);
               }
               else{
                    this.boardArray2[r].splice(c,1,1); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
                    this.boardArray2[(r+1)].splice((c),1,1);
                    this.boardArray2[(r+2)].splice((c),1,1);
                    this.boardArray2[(r-1)].splice((c),1,1);
                    this.ship2 = 0;
                    this.shipArray2[3].splice(0);
                    console.log("ship = " + this.ship2);
               }
            }
            else if (squareValue == 0 && this.ship2 == 5){
                if(this.rotate2 == false){
                    this.boardArray2[r].splice(c,1,1); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
                    this.boardArray2[(r)].splice((c+1),1,1);
                    this.boardArray2[(r)].splice((c+2),1,1);
                    this.boardArray2[(r)].splice((c-1),1,1);
                    this.boardArray2[(r)].splice((c-2),1,1);
                    this.ship2 = 0;
                    this.shipArray2[4].splice(0);
                    console.log("ship = " + this.ship2);
                }
                else{
                    this.boardArray2[r].splice(c,1,1); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
                    this.boardArray2[(r+1)].splice((c),1,1);
                    this.boardArray2[(r+2)].splice((c),1,1);
                    this.boardArray2[(r-1)].splice((c),1,1);
                    this.boardArray2[(r-1)].splice((c),1,1);
                    this.ship2 = 0;
                    this.shipArray2[4].splice(0);
                    console.log("ship = " + this.ship2);
                }
            }
            else if (squareValue == 1){
                this.boardArray2[r].splice(c,1,2); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
            }
            else if (squareValue == 0){
                this.boardArray2[r].splice(c,1,3); //This sets element shipArray[r][c] to 3, but does so in a way that Vue knows the array changed, so that the GUI gets updated automatically.
            }
        },
        selectShip1: function(r, value) {
            this.ship1 = value;
            console.log("Ship " + value);
        },
        selectShip2: function(r, value) {
            this.ship2 = value;
            console.log("Ship " + value);
        }
    },
    computed: {

    }
});

/*socket.on("sendBack", function(dfs) {
    console.log("The server returned data.");
    vm.board = dfs.board;
    message = "";
});
*/