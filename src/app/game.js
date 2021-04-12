document.addEventListener('keydown', keyPush);

// canvas
let canvas = null;
let score = null;
let info = null;
let ctx = null;

// player
const tileSize = 35;
let gameSpeed = 200;
let snakeX = 0;
let snakeY = 0;
let snakeSpeed = 0;
let snakeDiffX = 0;
let snakeDiffY = 0;
let clearX = 0;
let clearY = 0;
let foodX = 100;
let foodY = 100;
let tilesCountX = 0;
let tilesCountY = 0;
let scoreNum = 0;
let gameOver = false;
let lastKey = 'R';
let isPause = false;
let endEvent;
// let dataArray = [tilesCountX][tilesCountY];

// console.log('dd', dataArray);

const colorSnakeHead = 'black';
const colorSnakeBody = 'gray';
const colorFood = 'lime';
const colorSnakeEyes = 'goldenrod';
const colorSnakeCross = 'orangered';
const colorBkg = 'white';

let snakeData = [];


function init() {
    // console.log('doc', document);
    canvas = document.querySelector("canvas");
    if (!canvas) {
        return;
    }
    score = document.getElementById("score");
    info = document.getElementById("info");
    ctx = canvas?.getContext("2d");
    snakeY = canvas?.height / 2;
    snakeSpeed = tileSize;
    snakeDiffX = snakeSpeed;
    tilesCountX = canvas?.width / tileSize;
    tilesCountY = canvas?.height / tileSize;
    snakeData = [];
}

function startGame() {
    init();
    if (!canvas) {
        return;
    }
    // namalovat pole
    ctx.fillStyle = 'lightgray';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let y = 0; y < canvas.width / tileSize; y++) {
        for (let x = 0; x < canvas.width / tileSize; x++) {
            drawRect('white', x * tileSize, y * tileSize, tileSize - 1, tileSize - 1);
        }
    }

    //
    snakeData.push({ x: snakeX, y: snakeY });
    clearX = snakeX;
    clearY = snakeY;

    drawObject(colorSnakeHead, snakeX, snakeY);
    resetFood();
    gameLoop();
}

function gameLoop() {

    if (gameOver === false) {


        if (isPause == false) {
            // calc new pos of head
            snakeX += snakeDiffX;
            snakeY += snakeDiffY;

            if (snakeX >= canvas.width)
                snakeX = 0;

            if (snakeX <= -tileSize)
                snakeX = canvas.width - tileSize;

            if (snakeY >= canvas.height)
                snakeY = 0;

            if (snakeY <= -tileSize)
                snakeY = canvas.height - tileSize;


            drawObject(colorSnakeHead, snakeX, snakeY);
            switch (lastKey) {
                case 'L':
                    drawRect(colorSnakeEyes, snakeX + 5, snakeY + tileSize - 15, 10, 10);
                    drawRect(colorSnakeEyes, snakeX + 5, snakeY + 5, 10, 10);
                    drawTongue(colorSnakeCross);

                    break;
                case 'R':
                    drawRect(colorSnakeEyes, snakeX + tileSize - 15, snakeY + tileSize - 15, 10, 10);
                    drawRect(colorSnakeEyes, snakeX + tileSize - 15, snakeY + 5, 10, 10);
                    drawTongue(colorSnakeCross);
                    break;
                case 'U':
                    drawRect(colorSnakeEyes, snakeX + 5, snakeY + 5, 10, 10);
                    drawRect(colorSnakeEyes, snakeX + tileSize - 15, snakeY + 5, 10, 10);
                    drawTongue(colorSnakeCross);

                    break;
                case 'D':
                    drawRect(colorSnakeEyes, snakeX + 5, snakeY + tileSize - 15, 10, 10);
                    drawRect(colorSnakeEyes, snakeX + tileSize - 15, snakeY + tileSize - 15, 10, 10);
                    drawTongue(colorSnakeCross);

                    break;

                default:
                    break;
            }

            if (snakeData.some(i => i.x === snakeX && i.y === snakeY)) {
                info.textContent = `YOU LOSE, YOU HAVE EATEN YOUR BODY!`;
                stopGame();
            }

            // vlozit novu hlavu
            snakeData.splice(0, 0, { x: snakeX, y: snakeY });
            if (snakeX === foodX && snakeY === foodY) {
                if (snakeData.length > tilesCountX * tilesCountY - 1) {
                    score.textContent = ++scoreNum;
                    info.textContent = `YOU WIN!`;
                    stopGame();
                } else {
                    resetFood();
                    score.textContent = ++scoreNum;
                }
            } else {
                // mazat koniec
                var sd = snakeData[snakeData.length - 1];
                drawObject('white', sd.x, sd.y);
                // clear body
                snakeData.splice(-1, 1);
            }

            if (snakeData.length > 1) {
                var sd = snakeData[1];
                drawObject(colorSnakeBody, sd.x, sd.y);
                ctx.strokeStyle = colorSnakeCross;
                ctx.setLineDash([2, 2]);/*dashes are 5px and spaces are 3px*/
                ctx.beginPath();
                ctx.moveTo(sd.x + 5, sd.y + 5);
                ctx.lineTo(sd.x + tileSize - 5, sd.y + tileSize - 5);

                ctx.moveTo(sd.x + tileSize - 5, sd.y + 5);
                ctx.lineTo(sd.x + 5, sd.y + tileSize - 5);
                ctx.stroke();
            }
        }

        setTimeout(gameLoop, gameSpeed);
    }
}

function drawTongue(color) {
    ctx.strokeStyle = color;
    if (color === colorBkg) {
        ctx.lineWidth = 5;
    } else {
        ctx.lineWidth = 1;

    }
    ctx.fillStyle = color;
    ctx.setLineDash([]);/*dashes are 5px and spaces are 3px*/
    var x1 = snakeX;
    var y1 = snakeY;
    var x2 = 0;
    var y2 = 0;
    var x3 = 0;
    var y3 = 0;
    var x4 = 0;
    var y4 = 0;
    switch (lastKey) {
        case 'L':
            x1 -= 3;
            x2 = x1 - 6;
            y1 += tileSize / 2;
            y1 = Math.round(y1);
            y2 = y1;

            x3 = x2 - 5;
            y3 = y2 - 5;

            x4 = x2 - 5;
            y4 = y2 + 5;

            break;
        case 'R':
            x1 += tileSize + 3;
            x2 = x1 + 6;
            y1 += tileSize / 2;
            y1 = Math.round(y1);
            y2 = y1;

            x3 = x2 + 5;
            y3 = y2 + 5;

            x4 = x2 + 5;
            y4 = y2 - 5;

            break;

        case 'U':
            y1 -= 3;
            y2 = y1 - 6;
            x1 += tileSize / 2;
            x1 = Math.round(x1);
            x2 = x1;

            y3 = y2 - 5;
            x3 = x2 - 5;

            y4 = y2 - 5;
            x4 = x2 + 5;

            break;
        case 'D':

            y1 += tileSize + 3;
            y2 = y1 + 6;
            x1 += tileSize / 2;
            x1 = Math.round(x1);
            x2 = x1;

            y3 = y2 + 5;
            x3 = x2 + 5;

            y4 = y2 + 5;
            x4 = x2 - 5;

            break;

        default:
            break;
    }

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.moveTo(x2, y2);
    ctx.lineTo(x4, y4);
    ctx.closePath();
    ctx.stroke();


    ctx.lineWidth = 1;

}

function stopGame() {
    // document.removeEventListener('keydown', keyPush);
    gameOver = true;
    isPause = false;

    endEvent.emit({ score: scoreNum });

    // var ngEvent = new CustomEvent("CallAngularService", {score: scoreNum});

    //window.dispatchEvent(ngEvent);
    // gameEnd(scoreNum);
}

function drawRect(color, x, y, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}

function drawObject(color, x, y) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, tileSize - 1, tileSize - 1);
}


function keyPush(event) {
    if (gameOver) {
        return;
    }
    // alert(event.key.length);
    switch (event.key) {
        case 'ArrowUp':
            if (snakeDiffX !== 0) {
                snakeDiffX = 0;
                snakeDiffY = -snakeSpeed;
                drawTongue(colorBkg);

                lastKey = 'U';
            }
            break;
        case 'ArrowDown':
            if (snakeDiffX !== 0) {
                snakeDiffX = 0;
                snakeDiffY = snakeSpeed;
                drawTongue(colorBkg);
                lastKey = 'D';
            }
            break;
        case 'ArrowLeft':
            if (snakeDiffY !== 0) {
                snakeDiffX = -snakeSpeed;
                snakeDiffY = 0;
                drawTongue(colorBkg);
                lastKey = 'L';
            }
            break;
        case 'ArrowRight':
            if (snakeDiffY !== 0) {
                snakeDiffX = snakeSpeed;
                snakeDiffY = 0;
                drawTongue(colorBkg);
                lastKey = 'R';
            }
            break;

        case ' ':
            if (gameOver === false) {
                isPause = !isPause;
            }
            break;

        default:
            // if (gameOver === true) {
            //     location.reload();
            // }
            break;
    }
}

function resetFood() {
    while (true) {
        foodX = Math.floor(Math.random() * tilesCountX) * tileSize;
        foodY = Math.floor(Math.random() * tilesCountY) * tileSize;

        if (!snakeData.some(i => i.x === foodX && i.y === foodY)) {
            break;
        }
    }
    drawObject(colorFood, foodX, foodY);
}

function myTest(fnc) {
    endEvent = fnc;
    startGame();
}

// $(function() {
//     alert('Hello, custom js');
// });


startGame();