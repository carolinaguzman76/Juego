let game = {
    title: 'Lo he gastao to bailando',
    author: 'Carolina Guzman',
    license: null,
    version: '1.0',
    canvasDom: undefined,
    ctx: undefined,
    width: undefined,
    height: undefined,
    framesCounter: 0,
    keys: {
        space: 32,
        keyboard: 13
    },

    time: 0,
    timeOut: 30,

    init(id) {
        this.canvasDom = document.getElementById(id)
        this.ctx = this.canvasDom.getContext('2d')
        this.setDimensions()
        this.start()
    },

    setDimensions() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvasDom.width = this.width;
        this.canvasDom.height = this.height;
    },

    start() {
        this.reset();
        this.interval = setInterval(() => {
            this.clear()
            this.audio.play()
            this.framesCounter++
            if (this.framesCounter > 5000) this.framesCounter = 0
            
            if (this.framesCounter % 100 == 0 && this.time < this.timeOut) this.time++
            this.isCollision(this.player1)
            this.isCollision(this.player2)

            this.drawAll()

            if (this.time < this.timeOut) {
                this.moveDonuts()

                this.player1.movePlayer()
                this.player2.movePlayer()
            }

            if (this.time >= this.timeOut) {
                this.endGame("Fin del juego")

                this.drawCatFinish()

                this.audio.pause()

                if (this.player1.score > this.player2.score) {
                    this.winPlayer(`Bien por Manolito, ${this.player1.score} puntos`)
                  
                } else if (this.player1.score < this.player2.score) {
                    this.winPlayer(`Bravo por Carmencita, ${this.player2.score} puntos`)

                } else {
                    this.winPlayer(`Empate con ${this.player1.score} puntos`)
                }
            }
        }, 1000 / 60);
    },

    drawAll() {
        this.background.drawBg()
        this.background.drawCat()
        this.background.drawDogWindow()
        this.background.drawPicture()
        this.background.drawTextTime("Tiempo")
        this.background.drawTextPlayer1("Manolito")
        this.background.drawTextPlayer2("Carmencita")
        this.background.drawDogFloor()

        this.box.drawBox()

        this.player1.draw(this.framesCounter, 90, 100)
        this.player2.draw(this.framesCounter, 250, 100)

        this.drawTime()
    },

    moveDonuts() {
        this.player1.moveDonuts()
        this.player2.moveDonuts()
    },

    reset() {
        this.background = new Background(this.ctx, this.width, this.height);

        this.player1 = new Player(this.ctx, this.width, this.height, { SHOOT: { code: 32, down: false } }, "img/players/boyWalk.png", 300, 240, this.width / 2 - 600, this.height * 0.94 - 340, "./img/donuts1.png");
        this.player2 = new Player(this.ctx, this.width, this.height, { SHOOT: { code: 13, down: false } }, "img/players/girlWalk.png", 200, 240, this.width / 2 - 720, this.height * 0.99 - 240, "./img/donuts2.png");

        this.box = new Box(this.ctx, 180, 130, this.width - 220, this.height - 230)

        this.timeBoard = ScoreBoard;
        this.timeBoard.init(this.ctx);

        this.audio = new Audio("./musica/musicaFondo.wav")
    },

    clear() {
        this.ctx.clearRect(0, 0, this.canvasDom.width, this.canvasDom.height);
    },

    isCollision(player) {
        return player.donutsArray.some((donut, idx) => {
            if ((this.box.posX + this.box.width) >= donut._posX &&
            (donut._posY) >= this.box.posY &&
            this.box.posX <= (donut._posX + donut._width) &&
            donut._velY < 0) {
                
                player.donutsArray.splice(idx, 1)
                
                player.score += 1
                return true
            } else {
                return false
            }
        })
    },

    drawTime() {
        this.timeBoard.update(this.time, this.width / 2 + 190, this.height / 6, "green")
    },

    endGame(text) {
        this.ctx.font = '80px sans-serif'
        this.ctx.fillStyle = 'palevioletred'
        this.ctx.fillText(text, 500, 400)
    },

    winPlayer(text) {
        this.ctx.font = '60px sans-serif'
        this.ctx.fillStyle = 'white'
        this.ctx.fillText(text, this.width / 5, 650)
    },

    drawCatFinish() {
        let myImage = new Image()
        myImage.src = "./img/mazaoDonut.png"
        this.ctx.drawImage(myImage, this.width / 2 + 400, this.height / 2 - 50, 280, 400)
      }
}

// Etapas:
// player2 que tenga donuts - HECHO
// Implementar tiro - HECHO
// Colisiones - HECHO
// Pintar Marcador - HECHO
// Que los players se muevan (tener en cuenta que el donuts tiene que empezar donde este el player) - HECHO
// Final de juego - HECHO
// Musica - HECHO
// Pantalla de inicio - HECHO

// Posibles mejoras:
// A partir de una puntuacion aumentar la velocidad - HECHO
// Limitar el nunero de disparos/donuts - HECHO
// Diferentes donuts para cada jugador - HECHO
// Angulo de tiro variable
// Segun el tipo de donuts la puntuacion es diferente