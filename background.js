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

  drawDogWindow() {
    let myImage = new Image()
    myImage.src = "./img/leda.png"
    this.ctx.drawImage(myImage, this.width - 390, this.height / 3 - 5, 130, 130)
  }
  
  drawDogFloor() {
    let myImage = new Image()
    myImage.src = "./img/uller.png"
    this.ctx.drawImage(myImage, this.width/ 2 - 1100, this.height/ 2 - 340, 1300, 800)
  }

  drawPicture() {
    let myImage = new Image()
    myImage.src = "./img/cuadro.png"
    this.ctx.drawImage(myImage, this.width / 4 + 53, this.height / 8 - 45, 115, 164)
  }

  drawTextTime(text) {
    this.ctx.font = '50px sans-serif'
    this.ctx.fillStyle = 'midiumblue'
    this.ctx.fillText(text, this.width / 2 + 115, this.height / 6 - 60, 200, 100)
  }

  drawTextPlayer1(text) {
    this.ctx.font = '50px sans-serif'
    this.ctx.fillStyle = 'orangered'
    this.ctx.fillText(text, this.width / 6 - 190, this.height / 10 - 35, 110, 50)
  }

  drawTextPlayer2(text) {
    this.ctx.font = '50px sans-serif'
    this.ctx.fillStyle = 'orangered'
    this.ctx.fillText(text, this.width / 7, this.height / 10 - 35, 110, 50)
  }
}