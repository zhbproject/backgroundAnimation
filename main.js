var can;
var canHeight;
var canWidth;
var pointNumber = 50;
var deltaTime = 0;
var lastTime;
var point;
var mouseX,mouseY;// set two variables to save cursor position.
var changeX, changeY;
var colorArr = ["#000000", "#00ffff", "#0000ff", "#ff0000", "#000000"];
var currentColor = "#000000";


// main
document.body.onload = letMeGo;
function letMeGo () {
    lastTime = Date.now();
    can = document.getElementById("canvas");
    ctx = can.getContext('2d');

    can.height = document.body.clientHeight;
    can.width = document.body.clientWidth;
    // console.log("can1 is:", can);
    canHeight = can.height;
    canWidth = can.width;
    can.addEventListener('mousemove',onMouseMove,false);
    can.addEventListener('mousedown',onMouseDown,false);
    createPoint();
}

function createPoint () {
    point = new Point();
    point.init();
    point.draw();
    gameloop();
}


// game loop function
function gameloop()
{
    window.requestAnimationFrame(gameloop);
    ctx.clearRect(0,0,canWidth, canHeight);
    // console.log("loop");
    var now = Date.now();
    deltaTime = now - lastTime;
    lastTime = now;
    if(deltaTime > 40) deltaTime = 40;

    point.draw();
    // console.log("point is:", point);
}

function onMouseMove (e) {
    console.log("e is:", e);
    console.log("e.offsetX is:", e.offSetX, "\b e.layerX is:", e.layerX);
    if(e.offSetX || e.layerX)
    {
        changeX = (e.offSetX == undefined ? e.layerX : e.offSetX) - mouseX;
        changeY = (e.offSetY == undefined ? e.layerY : e.offSetY) - mouseY;  
        mouseX = e.offSetX == undefined ? e.layerX : e.offSetX;
        mouseY = e.offSetY == undefined ? e.layerY : e.offSetY;
    }

    // console.log("mouseX:", mouseX, ": mouseY:", mouseY);
}

function onMouseDown () {
    for (var i = 0; i < colorArr.length; i++) {
        if (colorArr[i] == currentColor) {
            currentColor = colorArr[i + 1];
            break;
        }
    }
}