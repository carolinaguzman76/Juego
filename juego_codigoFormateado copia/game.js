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
    timeOut: 5,

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
            this.framesCounter++
            if (this.framesCounter > 5000) this.framesCounter = 0
            // this.clear();
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

                if (this.player1.score > this.player2.score) {
                    // this.winPlayer(`Ganador player 1, con ${this.player1.score} puntos`)
                    console.log(this.player1.score)
                }
                if (this.player1.score < this.player2.score) {
                    this.winPlayer(`Ganador player 2, con ${this.player2.score} puntos`)

                } else {
                    this.winPlayer(`Empate con ${this.player1.score} puntos`)
                }
            }
        }, 1000 / 60);
    },

    drawAll() {
        this.background.drawBg()
        this.background.drawCat()
        this.box.drawBox()
        this.player1.draw(this.framesCounter, 200, 100)
        this.player2.draw(this.framesCounter, 90, 100)
        this.drawTime()
    },

    moveDonuts() {
        this.player1.moveDonuts()
        this.player2.moveDonuts()
    },

    reset() {
        this.background = new Background(this.ctx, this.width, this.height);

        this.player1 = new Player(this.ctx, this.width, this.height, { SHOOT: { code: 32, down: false } }, "img/players/boyWalk.png", 300, 240, this.width / 2 - 600, this.height * 0.94 - 340);
        this.player2 = new Player(this.ctx, this.width, this.height, { SHOOT: { code: 13, down: false } }, "img/players/girlWalk.png", 200, 240, this.width / 2 - 720, this.height * 0.99 - 240);

        this.box = new Box(this.ctx, 180, 130, this.width - 220, this.height - 230)

        this.timeBoard = ScoreBoard;
        this.timeBoard.init(this.ctx);
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
                
                let donut = player.donutsArray.splice(idx, 1)

                player.score += 1
                return true
            } else {
                return false
            }
        })
    },

    drawTime() {
        this.timeBoard.update(this.time, this.width / 2 + 200, this.height / 6, "green")
    },

    endGame(text) {
        this.ctx.font = '80px sans-serif'
        this.ctx.fillStyle = 'black'
        this.ctx.fillText(text, 500, 400)
    },

    winPlayer(text) {
        this.ctx.font = '60px sans-serif'
        this.ctx.fillStyle = 'black'
        this.ctx.fillText(text, this.width / 5, 600)
    }
}

// Etapas:
// player2 que tenga donuts - HECHO
// Implementar tiro - HECHO
// Colisiones - HECHO
// Pintar Marcador - HECHO
// Que los players se muevan (tener en cuenta que el donuts tiene que empezar donde este el player) - HECHO
// Final de juego
// Musica
// Pantalla de inicio

// Posibles mejoras:
// Angulo de tiro variable
// A partir de una puntuacion aumentar la velocidad
// Segun el tipo de donuts la puntuacion es diferente
// Limitar el nunero de disparos/donuts