class Donuts {
    constructor(ctx, url, width, height, posX, posY) {
        this._ctx = ctx

        this._image = new Image()
        this._image.src = url

        this._width = width
        this._height = height

        this._posX = posX
        this._posY = posY

        this._velX = 5
        this._velY = 20

        this._gravity = .45
    }

    draw() {
        this._ctx.drawImage(this._image, this._posX, this._posY, this._width, this._height)
    }

    move() {

        this._posX += this._velX
        this._velY += this._gravity
        this._posY += this._velY

        this._posY > window.innerHeight - this._height ? this._velY *= -1 : null
    }
}

