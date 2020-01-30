class Box {
    constructor(ctx, width, height, posX, posY) {
        this.ctx = ctx

        this.width = width
        this.height = height

        this.posX = posX
        this.posY = posY
    }

    drawBox() {
        this.ctx.fillStyle = 'peru'
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height)
    }
}
