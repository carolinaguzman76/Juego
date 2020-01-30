class Background {
  constructor(ctx, w, h) {
    this.ctx = ctx
    this.width = w
    this.height = h

    this.image = new Image()
    this.image.src = "./img/background.jpg"

    this.posX = 0
    this.posY = 0

  }

  drawBg() {
    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
  }

  drawCat() {
    let myImage = new Image()
    myImage.src = "./img/gallifrey.png"
    this.ctx.drawImage(myImage, this.width - 200, this.height - 360, 150, 150)
  }
}