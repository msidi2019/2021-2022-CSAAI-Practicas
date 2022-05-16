console.log('Ejecutando JS del Breakout...');

const canvas = document.getElementById("canvas");

//-- Definimos el tamaño del canvas
canvas.width = 605;
canvas.height = 470;

//-- Contexto del canvas
const ctx = canvas.getContext("2d");

//-- Definimos variables
var ballSize = 10;
var paddleHeight = 15;
var paddleWidth = 80;
var paddle = (canvas.width - paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
    // Estado del juego
var inProcess = false;

const BRICK = {
    columns: 10,
    rows: 6,
    width: 50,
    height: 15,
    padding: 8,
    marginTop: 60,
    marginLeft: 15,
    show: true
};

let x = canvas.width/2;
let y = canvas.height-190;
let velx = 4;
let vely = 3;
let scores = 0;
let lifes = 3;

//-- Definimos pelota
function drawBall() {
    ctx.beginPath();
        ctx.arc(x, y, ballSize, 0, Math.PI*2);
        ctx.fillStyle = '#F5CBA7';
        ctx.fill();
    ctx.closePath();
}

//-- Definimos raqueta
function drawPaddle() {
    ctx.beginPath();
        ctx.rect(paddle, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = 'white';
        ctx.fill();
    ctx.closePath();
    booleanPaddle();
}

//-- Definimos teclas raqueta y saque
function booleanPaddle() {
    window.onkeydown = (e) => {
        if (e.keyCode == 39) {
            rightPressed = true;
        } else if (e.keyCode == 37) {
            leftPressed = true;
        } else if (e.keyCode == 32 ) {
            inProcess = true;
            // Sacar con barra espaciadora
        }
    }
    window.onkeyup = (e) => {
        if (e.keyCode == 39) {
            rightPressed = false;
        }
        else if(e.keyCode == 37) {
            leftPressed = false;
        } 
    }
}

//-- Definimos sonidos
const playing = new Audio("mgk.mp3");
const point = new Audio("");
const touch = new Audio("");
const gameover = new Audio("tylerboo1.mp4");
const fail = new Audio("");
const win = new Audio("");

//-- Definimos ladrillos en matriz bidimensional
var bricks = [];
for (i=0; i<BRICK.columns; i++) {
    bricks[i] = [];
    for(j=0; j<BRICK.rows; j++) {
        bricks[i][j] = {
            x: (i*(BRICK.width+BRICK.padding))+BRICK.marginLeft,
            y: (j*(BRICK.height+BRICK.padding))+BRICK.marginTop,
            visible: BRICK.show
        };  // Asocio a cada ladrillo su posición y su visibilidad (true)
    }
}

//-- Definimos ladrillos
function drawBricks() {
    for(i=0; i<BRICK.columns; i++) {
        for(j=0; j<BRICK.rows; j++) {
            if(bricks[i][j].visible){
              ctx.beginPath();
                ctx.rect(bricks[i][j].x, bricks[i][j].y, BRICK.width, BRICK.height);
                ctx.fillStyle = '#D7BDE2';
                ctx.fill();
            ctx.closePath();  
            }       
        }
    }
}

//-- Detecto colisiones 
function collisions() {
    for(i=0; i<BRICK.columns; i++) {
        for(j=0; j<BRICK.rows; j++) {
            var l = bricks[i][j];
            if(l.visible == true) {
                if(x > l.x && x < l.x + BRICK.width && y > l.y && y < l.y + BRICK.height) {
                    vely = -vely;
                    l.visible = false;
                    point.play();
                    scores += 1;
                    console.log(scores);
                    if (scores == 63) {
                        win.play();
                        alert('YOU ROCK THE GAME');
                        document.location.reload();
                    }
                }
            }
        }
    }
}

//-- Mostrar puntuación y vidas
function drawPoints() {
    ctx.font = "30px Fantasy";
    ctx.filltyle = 'pink';
    ctx.fillText("Scores: " + scores, 20, 40);
    ctx.fillText("Lifes: " + lifes, 450, 40);
}

//-- Movimientos del juego
function move() {
    console.log('Pelota en movimiento...');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawPoints();
    collisions();

    if (inProcess) {
        setInterval(playing.play(), 500);
        if (x < ballSize || x >= (canvas.width - ballSize)) {
            velx = -velx;
        }
        if (y <= ballSize) {
            vely = -vely;
        } else if (y > (canvas.height - ballSize)) {
            if (x > paddle && x < paddle + paddleWidth) {
                vely = -vely;   // En caso de rebotar en la raqueta
                touch.play();
            } else {            // En caso de tocar el suelo
                fail.play();
                lifes = lifes - 1;
                if (lifes <= 0) {
                    gameover.play();
                    alert("LOSER");
                    document.location.reload();
                } else {
                    inProcess = false;
                    x = canvas.width/2;
                    y = canvas.height-190;
                    velx = 4;
                    vely = 2;
                    paddle = (canvas.width - paddleWidth)/2;
                }
            }
        }
        if(rightPressed && paddle < canvas.width - paddleWidth) {
            paddle = paddle + 7;
        } else if(leftPressed && paddle > 0) {
            paddle = paddle - 7;
        }

        x = x + velx;
        y = y + vely;
    }
    requestAnimationFrame(move);
}

move();