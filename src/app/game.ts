export class Game {
    canvas = null;
    score = null;
    ctx = null;
    // player
    readonly tileSize = 35;
    gameSpeed = 200;
    snakeX = 0;
    snakeY = 0;
    snakeSpeed = 0;
    snakeDiffX = 0;
    snakeDiffY = 0;
    clearX = 0;
    clearY = 0;
    foodX = 100;
    foodY = 100;
    tilesCountX = 0;
    tilesCountY = 0;
    scoreNum = 0;
    gameOver = false;
    lastKey = 'R';
    isPause = false;
    readonly colorSnakeHead = 'black';
    readonly colorSnakeBody = 'gray';
    readonly colorFood = 'lime';
    readonly colorSnakeEyes = 'goldenrod';
    readonly colorSnakeCross = 'orangered';
    readonly colorBkg = 'white';

    snakeData = [];
    gameOverMsg: any;

    constructor() {
        this.startGame();
    }

    init() {
        console.log('doc', document);
        this.canvas = document.querySelector("canvas");
        if (!this.canvas) {
            return;
        }
        this.score = document.getElementById("score");
        this.ctx = this.canvas?.getContext("2d");
        this.snakeY = this.canvas?.height / 2;
        this.snakeSpeed = this.tileSize;
        this.snakeDiffX = this.snakeSpeed;
        this.tilesCountX = this.canvas?.width / this.tileSize;
        this.tilesCountY = this.canvas?.height / this.tileSize;
        this.snakeData = [];
    }

    startGame() {
        this.init();
        if (!this.canvas) {
            return;
        }
        // namalovat pole
        this.ctx.fillStyle = 'lightgray';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        for (var y = 0; y < this.canvas.width / this.tileSize; y++) {
            for (var x = 0; x < this.canvas.width / this.tileSize; x++) {
                this.drawRect('white', x * this.tileSize, y * this.tileSize, this.tileSize - 1, this.tileSize - 1);
            }
        }

        //
        this.snakeData.push({ x: this.snakeX, y: this.snakeY });
        this.clearX = this.snakeX;
        this.clearY = this.snakeY;

        this.drawObject(this.colorSnakeHead, this.snakeX, this.snakeY);
        this.resetFood();
    //    this.gameLoop();
    }

    gameLoop() {

        if (this.gameOver === false) {


            if (this.isPause == false) {
                // calc new pos of head
                this.snakeX += this.snakeDiffX;
                this.snakeY += this.snakeDiffY;

                if (this.snakeX >= this.canvas.width)
                    this.snakeX = 0;

                if (this.snakeX <= -this.tileSize)
                    this.snakeX = this.canvas.width - this.tileSize;

                if (this.snakeY >= this.canvas.height)
                    this.snakeY = 0;

                if (this.snakeY <= -this.tileSize)
                    this.snakeY = this.canvas.height - this.tileSize;


                this.drawObject(this.colorSnakeHead, this.snakeX, this.snakeY);
                switch (this.lastKey) {
                    case 'L':
                        this.drawRect(this.colorSnakeEyes, this.snakeX + 5, this.snakeY + this.tileSize - 15, 10, 10);
                        this.drawRect(this.colorSnakeEyes, this.snakeX + 5, this.snakeY + 5, 10, 10);
                        this.drawTongue(this.colorSnakeCross);

                        break;
                    case 'R':
                        this.drawRect(this.colorSnakeEyes, this.snakeX + this.tileSize - 15, this.snakeY + this.tileSize - 15, 10, 10);
                        this.drawRect(this.colorSnakeEyes, this.snakeX + this.tileSize - 15, this.snakeY + 5, 10, 10);
                        this.drawTongue(this.colorSnakeCross);
                        break;
                    case 'U':
                        this.drawRect(this.colorSnakeEyes, this.snakeX + 5, this.snakeY + 5, 10, 10);
                        this.drawRect(this.colorSnakeEyes, this.snakeX + this.tileSize - 15, this.snakeY + 5, 10, 10);
                        this.drawTongue(this.colorSnakeCross);

                        break;
                    case 'D':
                        this.drawRect(this.colorSnakeEyes, this.snakeX + 5, this.snakeY + this.tileSize - 15, 10, 10);
                        this.drawRect(this.colorSnakeEyes, this.snakeX + this.tileSize - 15, this.snakeY + this.tileSize - 15, 10, 10);
                        this.drawTongue(this.colorSnakeCross);

                        break;

                    default:
                        break;
                }

                if (this.snakeData.some(i => i.x === this.snakeX && i.y === this.snakeY)) {
                    this.stopGame(`YOU LOSE, YOU HAVE EATEN YOUR BODY!`);
                }

                // vlozit novu hlavu
                this.snakeData.splice(0, 0, { x: this.snakeX, y: this.snakeY });
                if (this.snakeX === this.foodX && this.snakeY === this.foodY) {
                    if (this.snakeData.length > this.tilesCountX * this.tilesCountY - 1) {
                        this.score.textContent = ++this.scoreNum;
                        this.stopGame(`YOU WIN!`);
                    } else {
                        this.resetFood();
                        this.score.textContent = ++this.scoreNum;
                    }
                } else {
                    // mazat koniec
                    var sd = this.snakeData[this.snakeData.length - 1];
                    this.drawObject('white', sd.x, sd.y);
                    // clear body
                    this.snakeData.splice(-1, 1);
                }

                if (this.snakeData.length > 1) {
                    var sd = this.snakeData[1];
                    this.drawObject(this.colorSnakeBody, sd.x, sd.y);
                    this.ctx.strokeStyle = this.colorSnakeCross;
                    this.ctx.setLineDash([2, 2]);/*dashes are 5px and spaces are 3px*/
                    this.ctx.beginPath();
                    this.ctx.moveTo(sd.x + 5, sd.y + 5);
                    this.ctx.lineTo(sd.x + this.tileSize - 5, sd.y + this.tileSize - 5);

                    this.ctx.moveTo(sd.x + this.tileSize - 5, sd.y + 5);
                    this.ctx.lineTo(sd.x + 5, sd.y + this.tileSize - 5);
                    this.ctx.stroke();
                }
            }

      //      setTimeout(this.gameLoop, this.gameSpeed);
        }
    }

    drawTongue(color) {
        this.ctx.strokeStyle = color;
        if (color === this.colorBkg) {
            this.ctx.lineWidth = 5;
        } else {
            this.ctx.lineWidth = 1;

        }
        this.ctx.fillStyle = color;
        this.ctx.setLineDash([]);/*dashes are 5px and spaces are 3px*/
        var x1 = this.snakeX;
        var y1 = this.snakeY;
        var x2 = 0;
        var y2 = 0;
        var x3 = 0;
        var y3 = 0;
        var x4 = 0;
        var y4 = 0;
        switch (this.lastKey) {
            case 'L':
                x1 -= 3;
                x2 = x1 - 6;
                y1 += this.tileSize / 2;
                y1 = Math.round(y1);
                y2 = y1;

                x3 = x2 - 5;
                y3 = y2 - 5;

                x4 = x2 - 5;
                y4 = y2 + 5;

                break;
            case 'R':
                x1 += this.tileSize + 3;
                x2 = x1 + 6;
                y1 += this.tileSize / 2;
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
                x1 += this.tileSize / 2;
                x1 = Math.round(x1);
                x2 = x1;

                y3 = y2 - 5;
                x3 = x2 - 5;

                y4 = y2 - 5;
                x4 = x2 + 5;

                break;
            case 'D':

                y1 += this.tileSize + 3;
                y2 = y1 + 6;
                x1 += this.tileSize / 2;
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

        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.lineTo(x3, y3);
        this.ctx.moveTo(x2, y2);
        this.ctx.lineTo(x4, y4);
        this.ctx.closePath();
        this.ctx.stroke();


        this.ctx.lineWidth = 1;

    }

    stopGame(msg) {
        this.gameOver = true;
        this.gameOverMsg = msg;
        this.isPause = false;
    }

    drawRect(color, x, y, width, height) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }

    drawObject(color, x, y) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, this.tileSize - 1, this.tileSize - 1);
    }


    keyPush(event) {
        if (this.gameOver) {
            return;
        }
        // alert(event.key.length);
        switch (event.key) {
            case 'ArrowUp':
                if (this.snakeDiffX !== 0) {
                    this.snakeDiffX = 0;
                    this.snakeDiffY = -this.snakeSpeed;
                    this.drawTongue(this.colorBkg);

                    this.lastKey = 'U';
                }
                break;
            case 'ArrowDown':
                if (this.snakeDiffX !== 0) {
                    this.snakeDiffX = 0;
                    this.snakeDiffY = this.snakeSpeed;
                    this.drawTongue(this.colorBkg);
                    this.lastKey = 'D';
                }
                break;
            case 'ArrowLeft':
                if (this.snakeDiffY !== 0) {
                    this.snakeDiffX = -this.snakeSpeed;
                    this.snakeDiffY = 0;
                    this.drawTongue(this.colorBkg);
                    this.lastKey = 'L';
                }
                break;
            case 'ArrowRight':
                if (this.snakeDiffY !== 0) {
                    this.snakeDiffX = this.snakeSpeed;
                    this.snakeDiffY = 0;
                    this.drawTongue(this.colorBkg);
                    this.lastKey = 'R';
                }
                break;

            case ' ':
                if (this.gameOver === false) {
                    this.isPause = !this.isPause;
                }
                break;

            default:
                // if (gameOver === true) {
                //     location.reload();
                // }
                break;
        }
    }

    resetFood() {
        while (true) {
            this.foodX = Math.floor(Math.random() * this.tilesCountX) * this.tileSize;
            this.foodY = Math.floor(Math.random() * this.tilesCountY) * this.tileSize;

            if (!this.snakeData.some(i => i.x === this.foodX && i.y === this.foodY)) {
                break;
            }
        }
        this.drawObject(this.colorFood, this.foodX, this.foodY);
    }

};