class Player {
    constructor(ctx, w, h, keys, src, widthp, heightp, posX, posY, donutSrc) {
        this.ctx = ctx

        this.gameWidth = w
        this.gameHeight = h

        this.image = new Image()
        this.image.src = src

        this.width = widthp
        this.height = heightp

        this.posX = posX
        this.posY = posY

        this.keys = keys

        this.image.frames = 3 //Indicamos el numero de frames que tiene la imagen
        this.image.framesIndex = 0 //Frame actual menos 1, lo usaremos para recortar la imagen en drawImage

        this.donutsArray = []

        this.scoreBoard = ScoreBoard
        this.score = 0

        this.velX = 2
        this.velY = 0

        this.donutType = donutSrc

        this.counterShoot = 0

        this.setListeners()

        this.initScore()
    }

    draw(framesCounter, posX, posY) {
        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * Math.floor(this.image.width / this.image.frames), //Punto x donde empieza a recortar
            0, //Punto y donde empieza a recortar
            Math.floor(this.image.width / this.image.frames), //Punto x donde termina de recortar
            this.image.height, //Punto y donde termina de recortar
            this.posX,
            this.posY,
            this.width,
            this.height
        )

        this.animate(framesCounter); //Funcion que anima los frames.

        this.donutsArray.forEach(donuts => donuts.draw())

        this.scoreBoard.update(this.score, posX, posY, "darkblue")
    }

    animate(framesCounter) {
        if (framesCounter % 5 == 0) {
            this.image.framesIndex++; //Cambiamos el frame de la imagen cada 5 fps.
            if (this.image.framesIndex > 2) {
                this.image.framesIndex = 0;
            }
        }
    }

    setListeners() {
        document.addEventListener("keydown", e => {


            switch (e.keyCode) {
                case this.keys.SHOOT.code:
                    this.keys.SHOOT.down = true
                    this.counterShoot = this.counterShoot + 1

                    if (this.counterShoot % 5 == 0) {
                        this.shootDonuts()
                    }

                    break;
            }
        })
        document.addEventListener("keyup", e => {
            switch (e.keyCode) {
                case this.keys.SHOOT.code:
                    this.keys.SHOOT.down = false
                    break;
            }
        })
    }

    initScore() {
        this.scoreBoard.init(this.ctx)
    }

    moveDonuts() {
        this.donutsArray.forEach(donuts => donuts.move())
    }

    shootDonuts() {
        this.donutsArray.push(new Donuts(this.ctx, this.donutType, 60, 60, this.posX + this.width / 2, this.posY + this.height / 2))
    }

    movePlayer() {
        if (this.posX >= this.gameWidth - 500 || this.posX < 0) {
            this.changeDirection()
        } else {
            this.posX += this.velX
            if (this.score == 5) {
                this.velX += 0.5
            } else if (this.score == 10) {
                this.velX += 0.5
            }
        }
    }

    changeDirection() {
        this.velX *= -1
        this.posX += this.velX
    }
}
